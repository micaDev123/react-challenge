import React, { useEffect, useState } from "react";
import { Button, CheckLabel, Fieldset, HeadingTwo, Label, Radio } from "ui/library";

export const Filters = ({ setSearchQuery, setSortOrder, setSeverity, setStatus }) => {
    const [localSearch, setLocalSearch] = useState(localStorage.getItem("searchQuery") || "");
    const [localSeverity, setLocalSeverity] = useState(JSON.parse(localStorage.getItem("severityFilter")) || []);
    const [localStatus, setLocalStatus] = useState(JSON.parse(localStorage.getItem("statusFilter")) || []);
    const [sortOrder, setLocalSortOrder] = useState(localStorage.getItem("sortOrder") || "newest");

    useEffect(() => {
        localStorage.setItem("searchQuery", localSearch);
        localStorage.setItem("severityFilter", JSON.stringify(localSeverity));
        localStorage.setItem("statusFilter", JSON.stringify(localStatus));
        localStorage.setItem("sortOrder", sortOrder);
    }, [localSearch, localSeverity, localStatus, sortOrder]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(localSearch);
        setSeverity(localSeverity);
        setStatus(localStatus);
        setSortOrder(sortOrder);
    };

    const handleCheckboxChange = (value, setState, state, key) => {
        const newState = state.includes(value) ? state.filter(item => item !== value) : [...state, value];
        setState(newState);
        localStorage.setItem(key, JSON.stringify(newState));  // Persist changes to localStorage
    };

    const handleSortChange = (event) => {
        const newSortOrder = event.target.value;
        setLocalSortOrder(newSortOrder);
        setSortOrder(newSortOrder);  // Update parent component immediately
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
                        <Button type="submit">Run</Button>
                    </div>
                </Fieldset>

                <Fieldset>
                    <Label>Order by</Label>
                    <CheckLabel>
                        <Radio 
                            name="order-by" 
                            value="newest" 
                            onChange={handleSortChange}
                            checked={sortOrder === "newest"}
                        />
                        Newest first
                    </CheckLabel>
                    <CheckLabel>
                        <Radio 
                            name="order-by" 
                            value="oldest"
                            onChange={handleSortChange}
                            checked={sortOrder === "oldest"}
                        />
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
                                onChange={() => handleCheckboxChange(level.toLowerCase(), setLocalSeverity, localSeverity, "severityFilter")}
                                checked={localSeverity.includes(level.toLowerCase())}
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
                                onChange={() => handleCheckboxChange(statusValue.toLowerCase(), setLocalStatus, localStatus, "statusFilter")}
                                checked={localStatus.includes(statusValue.toLowerCase())}
                            />
                            {statusValue}
                        </CheckLabel>
                    ))}
                </Fieldset>
            </form>
        </>
    );
};
