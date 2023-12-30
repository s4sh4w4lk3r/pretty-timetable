import { useQuery } from '@apollo/client'
import { ALL_GROUPS } from '../../api/graphql/queries'

export default function Table() {
  const { data } = useQuery(ALL_GROUPS);

const items = data?.groups.map(e=> <li>{e.name}</li>) ;



  return (<ul>{ items}</ul>)
}
