import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "../Home/index";
import Movies from "../Movies";

const Drawer = createDrawerNavigator();

export default function Routes() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Movies" component={Movies} />
      </Drawer.Navigator>
    </>
  );
}
