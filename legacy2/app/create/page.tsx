import React from "react";
import { use } from "react";

import UserCount from "@/components/user_count";
import SelectTab from "@/components/select_tab";

const Create = () => {
  return (
    <main>
      <UserCount />
      <SelectTab active="create" />
    </main>
  );
};

export default Create;
