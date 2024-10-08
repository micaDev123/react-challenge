import React, { useState, useEffect } from "react";
import { Filters } from "./Filters";
import advisoriesData from "../../data/npm-advisories.json";
import { HeadingOne, Small, Tag, Table, Thead, Tbody, Tr, Th, Td } from "ui/library";

export const Vulnerabilities = () => {
  const [advisories, setAdvisories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchQuery") || "");
  const [sortOrder, setSortOrder] = useState(localStorage.getItem("sortOrder") || "newest");
  const [severityFilter, setSeverityFilter] = useState(JSON.parse(localStorage.getItem("severityFilter")) || []);
  const [statusFilter, setStatusFilter] = useState(JSON.parse(localStorage.getItem("statusFilter")) || []);

  useEffect(() => {
    const filteredAdvisories = advisoriesData.filter(advisory => {
      const matchesModule = advisory.module_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTitle = advisory.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeverity = severityFilter.length === 0 || severityFilter.includes(advisory.severity.toLowerCase());
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(advisory.patched_versions ? "patched" : "unpatched");

      return (matchesModule || matchesTitle) && matchesSeverity && matchesStatus;
    });

    const sortedAdvisories = sortOrder === "newest"
      ? filteredAdvisories.sort((a, b) => new Date(b.created) - new Date(a.created))
      : filteredAdvisories.sort((a, b) => new Date(a.created) - new Date(b.created));

    setAdvisories(sortedAdvisories);
  }, [searchTerm, severityFilter, statusFilter, sortOrder]);

return (
  <div className="md:flex md:flex-row-reverse">
    <div className="flex-shrink-0 md:flex-auto md:max-w-xs mb-4 md:mb-0 md:ml-3 p-4 md:p-6">
      <Filters
        setSearchQuery={setSearchTerm}
        setSortOrder={setSortOrder}
        setSeverity={setSeverityFilter}
        setStatus={setStatusFilter}
      />
    </div>

    <div className="flex-1 md:flex-auto">
      <div className="bg-white border border-gray-300 mx-auto p-4 md:p-6 rounded-lg lg:rounded-xl shadow-sm lg:shadow-md">
        <div className="mb-4">
          <HeadingOne>Security Advisories</HeadingOne>
          <Small>Showing {advisories.length} items</Small>
        </div>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Module Name</Th>
              <Th>Severity</Th>
              <Th>Advisory Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {advisories.map((advisory) => (
              <Tr key={advisory.id}>
                <Td>{advisory.title}</Td>
                <Td>{advisory.module_name}</Td>
                <Td>{advisory.severity}</Td>
                <Td>{new Date(advisory.created).toLocaleDateString()}</Td>
                <Td>
                  <Tag theme={advisory.patched_versions ? "info" : "danger"} title={`Status: ${advisory.patched_versions ? "Patched" : "Unpatched"}`}>
                    {advisory.patched_versions ? "Patched" : "Unpatched"}
                  </Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  </div>
);
};
