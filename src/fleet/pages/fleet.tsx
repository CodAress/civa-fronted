import React, { useEffect, useState } from 'react';
import { BusesService } from '../services/buses.service';
import { Bus } from '../model/bus.entite';

const Fleet: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);
    const busService = new BusesService();

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const data = await busService.getAll();
                setBuses(data);
            } catch (error) {
                console.error('Error fetching buses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBuses();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Fleet Management</h1>
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="border border-gray-300 px-4 py-2">#</th>
                                <th className="border border-gray-300 px-4 py-2">Number</th>
                                <th className="border border-gray-300 px-4 py-2">License Plate</th>
                                <th className="border border-gray-300 px-4 py-2">Brand</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buses.map((bus, index) => (
                                <tr key={bus.id} className="text-gray-800 border border-gray-200 hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.number}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.licensePlate}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.brand}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <span className={`px-2 py-1 rounded-lg text-white text-sm ${bus.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {bus.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Fleet;
