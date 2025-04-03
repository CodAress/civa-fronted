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
        <div className="container p-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-center">Fleet Management</h1>
            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-collapse border-gray-200 rounded-lg shadow-lg">
                        <thead>
                            <tr className="text-gray-700 bg-gray-100">
                                <th className="px-4 py-2 border border-gray-300">#</th>
                                <th className="px-4 py-2 border border-gray-300">Number</th>
                                <th className="px-4 py-2 border border-gray-300">License Plate</th>
                                <th className="px-4 py-2 border border-gray-300">Brand</th>
                                <th className="px-4 py-2 border border-gray-300">Features</th>
                                <th className="px-4 py-2 border border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buses.map((bus, index) => (
                                <tr key={bus.id} className="text-gray-800 border border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-2 text-center border border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{bus.number}</td>
                                    <td className="px-4 py-2 border border-gray-300">{bus.licensePlate}</td>
                                    <td className="px-4 py-2 border border-gray-300">{bus.brand}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <div className="flex flex-wrap gap-1">
                                            {bus.features?.split(',').map((feature, i) => (
                                                <span 
                                                    key={i}
                                                    className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
                                                >
                                                    {feature.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-center border border-gray-300">
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