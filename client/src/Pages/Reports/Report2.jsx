import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Reports from "./Reports";
import ExpenseReport from "./ExpenseReport";


export default function Report2({ coins, setSearch }) {
  const [value, setValue] = React.useState("income");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <TabContext value={value}>
      <div style={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} variant="fullWidth">
          <Tab label="income" value="income"  />
          <Tab label="expense" value="expense"  />
        </TabList>
      </div>
      <TabPanel value="income">
        <div className="grid-flex">
         <p>income</p>
         <Reports/>
        </div>
      </TabPanel>
      <TabPanel value="expense">
      <div className="grid-flex">
         <p>expense</p>
         <ExpenseReport/>
        </div>
      </TabPanel>
    </TabContext>
  );
}