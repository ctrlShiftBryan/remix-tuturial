import React from "react";
import type { LoaderFunction } from "remix";
import { useRouteData } from "remix";

interface User {
  avatar_url: string;
  bio: string;
  company: string;
  location: string;
  name: string;
}

export let loader: LoaderFunction = ({ params }) => {
  return fetch(`https://api.github.com/users/${params.member}`);
};

export default function TeamMember() {
  let user = useRouteData<User>();
  return (
    <div>
      <h3>{user.name}</h3>
      <img alt="user avatar" src={user.avatar_url} height="50" />
      <p>{user.bio}</p>
      <dl>
        <dt>Company</dt>
        <dd>{user.company}</dd>
        <dt>Location</dt>
        <dd>{user.location}</dd>
      </dl>
    </div>
  );
}