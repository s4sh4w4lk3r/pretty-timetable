import { useQuery } from '@apollo/client'
import { ALL_GROUPS } from '../../api/graphql/queries'
import { SubGroup } from '../../api/graphql/__generated__/graphql';

type Props = {
  groupHandler: (groupId: number) => void,
  subGroupHandler: (subGroup: SubGroup) => void,
}

function determineSubgroup(subGroupStr: string): SubGroup.FirstGroup | SubGroup.SecondGroup {
  switch (subGroupStr) {
    case "FIRST_GROUP": return SubGroup.FirstGroup;
    case "SECOND_GROUP": return SubGroup.SecondGroup;
    default: throw "Подгруппа не определена."
  }
}

export default function GroupSelector(props: Props) {
  const { data, loading, error } = useQuery(ALL_GROUPS)

  if (loading) return <p>Загрзука...</p>;
  if (error) return <p>Ошибка : {error.message}</p>;

  if (data?.groups === undefined || data?.groups.length === 0) {
    return <p>Нет данных</p>
  }

  const groupsElement = data.groups.map(g => <option value={g.id} key={g.id}>{g.name}</option>);
  return (
    <>
      <select onChange={(e) => props.groupHandler(Number.parseInt(e.target.value))}>
        {groupsElement}
      </select>

      <select onChange={(e) => props.subGroupHandler(determineSubgroup(e.target.value))}>
        <option value={SubGroup.FirstGroup}> Первая подгруппа </option>
        <option value={SubGroup.SecondGroup}> Вторая подгруппа </option>
      </select>
    </>
  )
}

