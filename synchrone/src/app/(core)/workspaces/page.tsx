import { Typography } from "@/components/common";
import { Workspace } from "./comps/Workspace";

export default function WorkspacesPage() {
  const promise = fetch('http://localhost:3000/api/workspaces', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
  
  return (
    <div className="p-4 flex flex-col gap-8">
      <Typography variant="h1">Проекты</Typography>
      <Workspace promise={promise} />
    </div>
  );
}