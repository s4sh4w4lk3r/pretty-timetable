import { useQuery } from '@apollo/client'
import { ALL_GROUPS } from '../../api/graphql/queries'
import { SubGroup } from '../../api/graphql/__generated__/graphql';
import { Group } from '../App';
import { ImmerHook, Updater } from "use-immer";

type Props = {
  groupState: ImmerHook<Group>,
  setGroupSelectorIsActive: Updater<boolean>
}

function determineSubgroup(subGroupStr: string): SubGroup.FirstGroup | SubGroup.SecondGroup {
  switch (subGroupStr) {
    case "FIRST_GROUP": return SubGroup.FirstGroup;
    case "SECOND_GROUP": return SubGroup.SecondGroup;
    default: throw "Подгруппа не определена."
  }
}

export default function GroupSelector(props: Props) {
  const {groupState, setGroupSelectorIsActive} = props;

  const { data, loading, error } = useQuery(ALL_GROUPS)
  const [group, setGroup] = groupState;

  if (loading) return <p>Загрзука...</p>;
  if (error) return <p>Ошибка : {error.message}</p>;

  if (data?.groups === undefined || data?.groups.length === 0) {
    return <p>Нет данных</p>
  }

  const groupsElement = data.groups.map(g => <option value={g.id} key={g.id}>{g.name}</option>);
  return (
    <>
      <select value={group.id} onChange={(e) => setGroup(g => {g.id = Number.parseInt(e.target.value)})}>
        {groupsElement}
      </select>

      <select value={group.subgroup} onChange={(e) => setGroup(sg => {sg.subgroup = determineSubgroup(e.target.value)})}>
        <option value={SubGroup.FirstGroup}> Первая подгруппа </option>
        <option value={SubGroup.SecondGroup}> Вторая подгруппа </option>
      </select>

      <button onClick={e=> {e.stopPropagation(); setGroupSelectorIsActive(false);}}>Сохранить выбор</button>
    </>
  )
}

