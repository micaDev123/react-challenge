import React,{useState,useEffect} from "react";
import {Filters} from "./Filters";
import advisoriesData from "../../data/npm-advisories.json";
import {HeadingOne, HeadingThree, Small, Tag, Table, Thead, Tbody, Tr, Th, Td} from "ui/library";

export const Vulnerabilities = () => {
      const [advisories, setAdvisories] = useState(advisoriesData);
      const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchQuery") || "");
      const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder") || "newest");
      const [severityFilter, setSeverityFilter] = useState(JSON.parse(localStorage.getItem("severityFilter")) || []);
      const [statusFilter, setStatusFilter] = useState(JSON.parse(localStorage.getItem("statusFilter")) || []);

  useEffect(() => {
    
    let filteredAdvisories = [...advisoriesData];

    if(searchTerm){
      filteredAdvisories = filteredAdvisories.filter((advisory) =>
        advisory.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advisory.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if(severityFilter.length > 0){
      filteredAdvisories = filteredAdvisories.filter((advisory) =>
        severityFilter.includes(advisory.severity.toLowerCase())
      );
    }
    if(statusFilter.length > 0){
      filteredAdvisories = filteredAdvisories.filter((advisory) =>
        statusFilter.includes(advisory.patched_versions ? "patched" : "unpatched")
      );
    }
    if(sortOrder === "newest"){
      filteredAdvisories.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else {
      filteredAdvisories.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    setAdvisories(filteredAdvisories);
  }, [searchTerm, severityFilter, statusFilter, sortOrder]);

return (
<div className="md:flex md:flex-row-reverse">
  <div className="flex-shrink-0 md:flex-auto md:max-w-xs mb-4 md:mb-0 md:ml-3 p-4 md:p-6">
    <Filters
      searchQuery={searchTerm}
      setSearchQuery={setSearchTerm}
      setSortOrder={setSortOrder}
      setSeverity={setSeverityFilter}
      setStatus={setStatusFilter}
    />
  </div>

  <div className="flex-1 md:flex-auto">
    <div className="bg-white border border-gray-300 mx-auto p-4 md:p-6 rounded-lg lg:rounded-xl shadow-sm lg:shadow-md">
      <div className="mb-4">
        <HeadingOne>Security advisories</HeadingOne>
        <Small>Showing {advisories.length} items</Small>
      </div>

      {advisories.length === 0 ? (
        <p>No advisories found matching your search criteria.</p>
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th textAlign="left">Advisory</Th>
              <Th>Date of advisory</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {advisories.map((advisory) => (
              <Tr key={advisory.id}>
                <Td>
                  <Small className="block mb-0.5 font-bold">{advisory.module_name}</Small>
                  <HeadingThree className="mb-1">{advisory.title}</HeadingThree>
                  <Tag theme="success" title={`Severity: ${advisory.severity}`}>{advisory.severity}</Tag>
                </Td>
                <Td textAlign="center">
                  <p className="text-gray-600">{new Date(advisory.created).toLocaleDateString()}</p>
                </Td>
                <Td textAlign="center">
                  <Tag theme={advisory.patched_versions ? "info" : "danger"} title={`Status: ${advisory.patched_versions ? "Patched" : "Unpatched"}`}>
                    {advisory.patched_versions ? "Patched" : "Unpatched"}
                  </Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  </div>
</div>
);
};
