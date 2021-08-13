import React from "react";
import { Link, Outlet } from "react-router-dom";
import type { LinksFunction, LoaderFunction } from "remix";
import { useRouteData } from "remix";
import styles from "../styles/team.css";


let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

interface Member {
  id: string;
  login: string;
}

export let loader: LoaderFunction = () => {
  // you can point to whatever org you want, ofc
  const token = "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";
  return fetch("https://api.github.com/orgs/reacttraining/members", {
    headers: { 
      "Context-Type": "application/json",
      Authorization: `token ${token}`
    }
  });
};

export default function Team() {
  let data = useRouteData<Member[]>();
  console.log(data)
  return (
    <div>
      <h2>Team</h2>
      <ul>
        {data.map(member => (
          <li key={member.id}>
            <Link to={member.login}>{member.login}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
