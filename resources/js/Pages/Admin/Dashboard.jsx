import React, {useEffect} from "react";
import { Head, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Users,
    CreditCard,
    CalendarDays,
    CheckCircle,
} from "lucide-react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";
import CountUp from "react-countup";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard({ flash }) {
    const user = usePage().props.auth.user;

    useEffect(()=> {
        if(flash.message.success){
            toast.success(flash.message.success);
        }
        if(flash.message.error){
            toast.error(flash.message.error);
        }
    }, [flash]);

    const stats = {
        totalMahasiswa: 150,
        pembayaranPending: 25,
        ujianTerjadwal: 10,
        pendaftaranSelesai: 90,
    };

    const chartData = [
        { name: "Sudah Daftar", value: 90 },
        { name: "Belum Bayar", value: 25 },
        { name: "Sudah Bayar", value: 35 },
    ];

    const trendData = [
        { month: "Jan", daftar: 30 },
        { month: "Feb", daftar: 45 },
        { month: "Mar", daftar: 60 },
        { month: "Apr", daftar: 50 },
        { month: "Mei", daftar: 80 },
        { month: "Jun", daftar: 70 },
    ];

    const COLORS = ["#4CAF50", "#FF9800", "#2196F3"];

    return (
        <AdminLayout
            header={`Dashboard Admin`}
        >
            <Head title="Dashboard Admin" />
            <ToastContainer />

            <div className="space-y-6">
                {/* WELCOME CARD */}
                <div className="bg-white p-6 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold">
                            Selamat datang, {user.name} 👋
                        </h2>
                        <p className="text-gray-500">
                            Hari ini:{" "}
                            {new Date().toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                        )}`}
                        alt="Avatar"
                        className="w-14 h-14 rounded-full shadow-md"
                    />
                </div>

                {/* WIDGETS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <WidgetCard
                        icon={<Users className="w-8 h-8 text-white" />}
                        title="Total Mahasiswa"
                        value={stats.totalMahasiswa}
                        gradient="linear-gradient(135deg, #667eea, #764ba2)"
                    />
                    <WidgetCard
                        icon={<CreditCard className="w-8 h-8 text-white" />}
                        title="Pembayaran Pending"
                        value={stats.pembayaranPending}
                        gradient="linear-gradient(135deg, #ff758c, #ff7eb3)"
                    />
                    <WidgetCard
                        icon={<CalendarDays className="w-8 h-8 text-white" />}
                        title="Ujian Terjadwal"
                        value={stats.ujianTerjadwal}
                        gradient="linear-gradient(135deg, #f7971e, #ffd200)"
                    />
                    <WidgetCard
                        icon={<CheckCircle className="w-8 h-8 text-white" />}
                        title="Pendaftaran Selesai"
                        value={stats.pendaftaranSelesai}
                        gradient="linear-gradient(135deg, #43cea2, #185a9d)"
                    />
                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4">
                            Statistik Pendaftaran
                        </h3>
                        <div className="w-full h-72">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        dataKey="value"
                                        label={({ name, percent }) =>
                                            `${name} ${(percent * 100).toFixed(
                                                0
                                            )}%`
                                        }
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-lg font-bold mb-4">
                            Tren Pendaftaran Bulanan
                        </h3>
                        <div className="w-full h-72">
                            <ResponsiveContainer>
                                <BarChart data={trendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="daftar"
                                        fill="#77BEF0"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* AKTIVITAS TERBARU */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Aktivitas Terbaru</h3>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li>👤 Budi mendaftar (5 menit lalu)</li>
                        <li>💳 Pembayaran diterima dari Siti (1 jam lalu)</li>
                        <li>📅 Ujian Matematika dijadwalkan (2 hari lagi)</li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}

function WidgetCard({ icon, title, value, gradient }) {
    return (
        <div
            className="rounded-2xl p-5 flex items-center space-x-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
                background: gradient,
                color: "#fff",
            }}
        >
            <div className="bg-white bg-opacity-20 rounded-full p-3">
                {icon}
            </div>
            <div>
                <p className="text-sm opacity-90">{title}</p>
                <p className="text-3xl font-bold">
                    <CountUp end={value} duration={1.5} separator="," />
                </p>
            </div>
        </div>
    );
}
