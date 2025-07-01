
import React from 'react';
import { X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DetailedViewProps {
  type: string;
  onClose: () => void;
}

const mockData = {
  properties: [
    { id: 1, name: "Villa Nova", location: "Miami Beach", bedrooms: 3, revenue: "$3,420", occupancy: "95%" },
    { id: 2, name: "Ocean View", location: "Key West", bedrooms: 2, revenue: "$2,890", occupancy: "88%" },
    { id: 3, name: "Sunset Retreat", location: "Naples", bedrooms: 4, revenue: "$2,150", occupancy: "92%" },
    { id: 4, name: "City Loft", location: "Downtown Miami", bedrooms: 1, revenue: "$1,980", occupancy: "85%" },
    { id: 5, name: "Beach House", location: "Fort Lauderdale", bedrooms: 3, revenue: "$2,670", occupancy: "90%" },
    { id: 6, name: "Garden Villa", location: "Coral Gables", bedrooms: 2, revenue: "$1,890", occupancy: "87%" },
    { id: 7, name: "Modern Condo", location: "Brickell", bedrooms: 2, revenue: "$2,200", occupancy: "93%" },
    { id: 8, name: "Poolside Paradise", location: "Hollywood", bedrooms: 3, revenue: "$2,590", occupancy: "89%" }
  ],
  turnovers: [
    { id: 1, property: "Villa Nova", date: "2025-01-08", time: "11:00 AM", status: "Scheduled" },
    { id: 2, property: "Ocean View", date: "2025-01-09", time: "2:00 PM", status: "Confirmed" },
    { id: 3, property: "City Loft", date: "2025-01-10", time: "10:00 AM", status: "In Progress" },
    { id: 4, property: "Beach House", date: "2025-01-11", time: "3:00 PM", status: "Scheduled" },
    { id: 5, property: "Modern Condo", date: "2025-01-12", time: "12:00 PM", status: "Confirmed" }
  ],
  maintenance: [
    { id: 1, property: "Sunset Retreat", issue: "AC Filter Replacement", priority: "Medium", status: "In Progress" },
    { id: 2, property: "Garden Villa", issue: "Wifi Router Setup", priority: "Low", status: "Scheduled" }
  ]
};

export default function DetailedView({ type, onClose }: DetailedViewProps) {
  const getTitle = () => {
    switch (type) {
      case 'properties': return 'Properties Under Management';
      case 'turnovers': return 'Upcoming Turnovers';
      case 'maintenance': return 'Open Maintenance Issues';
      default: return 'Details';
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'properties':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Occupancy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.name}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>{property.bedrooms}</TableCell>
                  <TableCell>{property.revenue}</TableCell>
                  <TableCell>{property.occupancy}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case 'turnovers':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.turnovers.map((turnover) => (
                <TableRow key={turnover.id}>
                  <TableCell className="font-medium">{turnover.property}</TableCell>
                  <TableCell>{turnover.date}</TableCell>
                  <TableCell>{turnover.time}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      turnover.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      turnover.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {turnover.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      case 'maintenance':
        return (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.maintenance.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.property}</TableCell>
                  <TableCell>{item.issue}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.priority === 'High' ? 'bg-red-100 text-red-800' :
                      item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        );
      
      default:
        return <p>No data available</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
