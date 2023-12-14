import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import StatisticApi from "../../api/StatisticApi";
import { useState, useEffect } from "react";
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale, BarElement, Title, PointElement,
    LineElement,);
const { RangePicker } = DatePicker;
const Statistic = () => {
    const [selectedDate1, setSelectedDate1] = useState({ startDate: dayjs().subtract(1, 'day'), endDate: dayjs() });
    const [doanhthu, setDoanhthu] = useState(0);
    const fetchDoanhThu = async () => {
        try {
            const res = await StatisticApi.getDoanhThu(selectedDate1.startDate, selectedDate1.endDate);
            setDoanhthu(res.doanhthu);
        }
        catch (e) {

        }
    }
    useEffect(() => {

        fetchDoanhThu();
    }, [])

    function formatNumberWithCommas(number) {
        if (isNaN(number)) {
            return "Không phải là số";
        }
        let numberString = number.toString();
        let decimalIndex = numberString.indexOf('.');

        let length = decimalIndex === -1 ? numberString.length : decimalIndex;
        let formattedNumber = "";

        for (let i = length - 1, j = 0; i >= 0; i--, j++) {
            formattedNumber = numberString[i] + formattedNumber;
            if (j % 3 === 2 && i > 0) {
                formattedNumber = ',' + formattedNumber;
            }
        }

        if (decimalIndex !== -1) {
            formattedNumber += numberString.slice(decimalIndex);
        }

        return formattedNumber;
    }


    function getDaysInMonth(startDate, endDate) {

        const daysArray = [];
        const lb = [];
        let currentDate = startDate;
        let i = 1;
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
            daysArray.push(currentDate);
            lb.push(i + "");
            i++;
            currentDate = currentDate.add(1, 'day');
        }

        setLabelDay(lb);
        return daysArray;
    }
    const labels = ['Số đơn đặt', 'Số đơn đợi duyệt', 'Số đơn đang giao', "Số đơn giao thành công", "Số đơn bị hủy"];
    const labelsMon = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const [labelDay, setLabelDay] = useState([]);

    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedYear, setSelectedYear] = useState(dayjs());
    const [selectedMonth, setSelectedMonth] = useState(dayjs());

    const [dateBar, setDataBar] = useState({
        labels: labelsMon,
        datasets: [
            {
                label: 'Số đơn đặt',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: 'Số đơn đợi duyệt',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Số đơn đang giao',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Số đơn giao thành công',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Số đơn bị hủy',
                data: Array(12).fill(0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    })
    const [dataDoughnut, setDataDoughnut] = useState({
        labels: labels,
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',

                ],
                borderWidth: 1,
            }
        ]
    });
    const [dataline, setDataline] = useState({
        labels: labelDay,
        datasets: [
            {
                label: 'Số đơn đặt',
                data: [0],
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
            },
            {
                label: 'Số đơn đợi duyệt',
                data: [0],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Số đơn đang giao',
                data: [0],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Số đơn giao thành công',
                data: [0],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Số đơn bị hủy',
                data: [0],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ]
    })
    console.log(dataDoughnut);
    const fetchDataDoughnut = async (startDate, endDate) => {
        try {
            const res1 = await StatisticApi.getDonHang(startDate, endDate);
            console.log(res1.donDangChuanBi, res1.donDangCho, res1.donDangGiao, res1.donThanhCong, res1.donHuy);
            setDataDoughnut({
                labels: labels,
                datasets: [
                    {
                        data: [res1.donDangChuanBi, res1.donDangCho, res1.donDangGiao, res1.donThanhcong, res1.donHuy],
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(126, 215, 193, 0.2)',
                            'rgba(188, 122, 249, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(126, 215, 193, 1)',
                            'rgba(188, 122, 249, 1)',
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                    }
                ]
            });
        } catch (e) {

        }
    };

    const fetchDataLine = async (startDate, endDate) => {
        try {
            const dt = [];
            const dat1 = Array(labelDay.length).fill(0);
            const dat2 = Array(labelDay.length).fill(0)
            const dat3 = Array(labelDay.length).fill(0)
            const dat4 = Array(labelDay.length).fill(0)
            const dat5 = Array(labelDay.length).fill(0)

            let i2 = 0;

            await Promise.all(
                getDaysInMonth(startDate, endDate).map(async (date, i) => {
                    const stDate = dayjs(date).startOf('day');
                    const edDate = dayjs(date).endOf('day');
                    const res1 = await StatisticApi.getDonHang(stDate, edDate);
                    dat1[i] = res1.donDangChuanBi
                    dat2[i] = res1.donDangCho
                    dat3[i] = res1.donDangGiao
                    dat4[i] = res1.donThanhcong
                    dat5[i] = res1.donHuy
                    dt.push(i2 + 1);
                    i2++;

                })
            );

            setDataline({
                labels: dt,
                datasets: [
                    {
                        label: 'Số đơn đặt',
                        data: dat1,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)'
                    },
                    {
                        label: 'Số đơn chờ duyệt',
                        data: dat2,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        borderColor: 'rgba(53, 162, 235, 1)'
                    },
                    {
                        label: 'Số đơn đang giao',
                        data: dat3,
                        backgroundColor: 'rgba(126, 215, 193, 0.5)',
                        borderColor: 'rgba(126, 215, 193, 1)'
                    },
                    {
                        label: 'Số đơn giao thành công',
                        data: dat4,
                        backgroundColor: 'rgba(188, 122, 249, 0.5)',
                        borderColor: 'rgba(188, 122, 249, 1)'
                    }, {
                        label: 'Số đơn bị hủy',
                        data: dat5,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                    }
                ],
            });
        } catch (e) {

        }
    };


    const fetchDataBar = async (startDate, endDate) => {
        try {
            const monthlyData1 = Array(12).fill(0);
            const monthlyData2 = Array(12).fill(0);
            const monthlyData3 = Array(12).fill(0);
            const monthlyData4 = Array(12).fill(0);
            const monthlyData5 = Array(12).fill(0);

            for (let i = 0; i < 12; i++) {
                const startOfMonth = startDate.month(i).startOf('month');
                const endOfMonth = startDate.month(i).endOf('month');

                const res1 = await StatisticApi.getDonHang(startOfMonth, endOfMonth);

                monthlyData1[i] = res1.donDangChuanBi
                monthlyData2[i] = res1.donDangCho
                monthlyData3[i] = res1.donDangGiao
                monthlyData4[i] = res1.donThanhcong
                monthlyData5[i] = res1.donHuy


            }
            setDataBar({
                labels: labelsMon,
                datasets: [
                    {
                        label: 'Số đơn đặt',
                        data: monthlyData1,
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    },
                    {
                        label: 'Số đơn chờ duyệt',
                        data: monthlyData2,
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    },
                    {
                        label: 'Số đơn đang giao',
                        data: monthlyData3,
                        backgroundColor: 'rgba(126, 215, 193, 0.5)',
                    },
                    {
                        label: 'Số đơn giao thành công',
                        data: monthlyData4,
                        backgroundColor: 'rgba(188, 122, 249, 0.5)',
                    }, {
                        label: 'Số đơn bị hủy',
                        data: monthlyData5,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }

                ]
            });
        } catch (e) {

        }
    };

    const handleDateChange = (date, dateString) => {
        const startDate = dayjs(date).startOf('day');
        const endDate = dayjs(date).endOf('day');
        setSelectedDate(dayjs(date));

        fetchDataDoughnut(startDate, endDate);
    };

    const handleYearChange = (date, dateString) => {
        const startDate = dayjs(date).startOf('year');
        const endDate = dayjs(date).endOf('year');
        setSelectedYear(dayjs(date));
        fetchDataBar(startDate, endDate);
    };

    useEffect(() => {
        fetchDataDoughnut(selectedDate.startOf('day'), selectedDate.endOf('day'));
    }, [selectedDate]);

    useEffect(() => {
        fetchDataBar(selectedYear.startOf('year'), selectedYear.endOf('year'));
    }, [selectedYear]);

    useEffect(() => {
        getDaysInMonth(dayjs().startOf("month"), dayjs().endOf("month"))
        fetchDataLine(selectedMonth.startOf("month"), selectedMonth.endOf("month"));
    }, [])

    return <>
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
                <div className="flex flex-col gap-[20px] w-[21%] bg-white px-[20px] py-[20px] rounded-[20px]"
                    style={{ display: 'flex', flexDirection: "column", width: '300px', gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                    <p className=" text-[28px] font-[600]" style={{ fontSize: '24px', fontWeight: '600' }}>Thống kê doanh thu</p>
                    <RangePicker
                        onChange={(e) => {
                            setSelectedDate1({ startDate: e[0], endDate: e[1] })
                            fetchDoanhThu();
                        }}
                        defaultValue={[selectedDate1.startDate, selectedDate1.endDate]}
                    />
                    <p style={{ fontSize: '32px', fontWeight: '600', color: '#333', textAlign: 'center' }}>{formatNumberWithCommas(doanhthu)} VND</p>
                </div>
                <div className="flex flex-col gap-[20px] w-[21%] bg-white px-[20px] py-[20px] rounded-[20px]"
                    style={{ display: 'flex', flexDirection: "column", width: '600px', gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                    <p className=" text-[20px] font-[600]" style={{ fontSize: '24px', fontWeight: '600' }}>Số đơn trong ngày</p>
                    <DatePicker
                        onChange={handleDateChange}
                        defaultValue={selectedDate}
                    />
                    <Doughnut data={dataDoughnut} />
                </div>
                <div>
                    <div className="flex flex-col gap-[20px] w-[40%] bg-white px-[20px] py-[20px] rounded-[20px]"
                        style={{ display: 'flex', flexDirection: "column", width: '600px', gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                        <p className=" text-[20px] font-[600]" style={{ fontSize: '24px', fontWeight: '600' }}>Số đơn trong năm</p>
                        <DatePicker
                            onChange={handleYearChange}
                            picker="year"
                            defaultValue={selectedYear}
                        />
                        <Bar data={dateBar} options={{ responsive: true, }} />
                    </div>
                    <div className="flex flex-col gap-[20px] w-[62%] bg-white px-[20px] py-[20px] rounded-[20px]"
                        style={{ display: 'flex', marginTop: '20px', flexDirection: "column", width: '600px', gap: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '20px' }}>
                        <p className=" text-[20px] font-[600]" style={{ fontSize: '24px', fontWeight: '600' }}>Số đơn trong tháng</p>
                        <DatePicker
                            onChange={(date) => {
                                const startDate = dayjs(date).startOf('month');
                                const endDate = dayjs(date).endOf('month');
                                setSelectedMonth(dayjs(date));
                                fetchDataLine(startDate, endDate)
                            }}
                            picker="month"
                            defaultValue={selectedMonth}
                        />
                        <Line data={dataline} options={{ responsive: true, }} />
                    </div>
                </div>

            </div>

        </div>
    </>
}

export default Statistic;