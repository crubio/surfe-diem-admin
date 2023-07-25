import { getSummaries } from "@features/summaries/api/summaries";
import { useQuery } from "@tanstack/react-query";

function SummariesPage() {
  const { data} = useQuery(["summaries"], getSummaries);
  const summaries = data || [];
  console.log(summaries);
  
  return (
    <>
      {"WIP: summaries page"}
    </>
  )
}

export default SummariesPage;