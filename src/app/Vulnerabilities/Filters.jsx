import React,{useState} from "react";
import { Button, CheckLabel, Fieldset, HeadingTwo, Label, Radio } from "ui/library";

export const Filters = ({ searchQuery, setSearchQuery, setSortOrder, setSeverity, setStatus }) => {
      const [localSearch, setLocalSearch] = useState(searchQuery);
      const [localSeverity, setLocalSeverity] = useState([]);
      const [localStatus, setLocalStatus] = useState([]);

  const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearch);
        setSeverity(localSeverity);
        setStatus(localStatus);
  };

  const handleCheckboxChange = (value, setState, state) => {
    if (state.includes(value)) {
    setState(state.filter((item) => item !== value));
    } else {
    setState([...state, value]);
    }
  };


return (
<>
<HeadingTwo>Filters</HeadingTwo>
<form onSubmit={handleSearchSubmit}>
  <Fieldset>
    <Label htmlFor="search">Search</Label>
    <div className="flex items-center mb-2">
      <input
        className="block border-1 border-gray-300 form-input mr-2 placeholder-gray-400 px-3 py-2 rounded-lg w-full"
        type="text"
        id="search"
        placeholder="e.g., postcss"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
      <Button type="submit">Search</Button>
    </div>
  </Fieldset>

  <Fieldset>
    <Label>Order by</Label>
    <CheckLabel>
      <Radio name="order-by" value="newest" defaultChecked onChange={() => setSortOrder("newest")} />
      Newest first
    </CheckLabel>
    <CheckLabel>
      <Radio name="order-by" value="oldest" onChange={() => setSortOrder("oldest")} />
      Oldest first
    </CheckLabel>
  </Fieldset>
  <Fieldset>
    <Label>Severity</Label>
    {["High", "Info", "Moderate", "Low", "Critical"].map((level) => (
      <CheckLabel key={level}>
        <input
          type="checkbox"
          className="form-checkbox mr-2 rounded text-blue-500"
          onChange={() => handleCheckboxChange(level.toLowerCase(), setLocalSeverity, localSeverity)}
        />
        {level}
      </CheckLabel>
    ))}
  </Fieldset>
  <Fieldset>
    <Label>Module  Name</Label>
    {["High", "Info", "Moderate", "Low", "Critical"].map((level) => (
      <CheckLabel key={level}>
        <input
          type="checkbox"
          className="form-checkbox mr-2 rounded text-blue-500"
          onChange={() => handleCheckboxChange(level.toLowerCase(), setLocalSeverity, localSeverity)}
        />
        {level}
      </CheckLabel>
    ))}
  </Fieldset>
  <Fieldset>
    <Label>Status</Label>
    {["Patched", "Unpatched"].map((statusValue) => (
      <CheckLabel key={statusValue}>
        <input
          type="checkbox"
          className="form-checkbox mr-2 rounded text-blue-500"
          onChange={() => handleCheckboxChange(statusValue.toLowerCase(), setLocalStatus, localStatus)}
        />
        {statusValue}
      </CheckLabel>
    ))}
  </Fieldset>
</form>
</>
);
};
