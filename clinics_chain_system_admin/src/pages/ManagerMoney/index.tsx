import { DatePicker, DatePickerProps, Tabs, TabsProps } from 'antd'
import React, { useState } from 'react'
import Cosovatchat from './components/Cosovatchat';
import Tienkham from './components/Tienkham';
import Traluong from './components/Traluong';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function ManagerMoney() {
    const [tabIndex, setTabIndex] = useState("1");
    const { authUser } = useSelector((state:RootState) => state.user)

    const onChangeTab = (key: string) => {
        console.log(key);
        setTabIndex(key);
    };
      
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Mua cơ sở vật chất`,
            children: <Cosovatchat />,
        },
        // {
        //     key: '2',
        //     label: `Chi trả lương`,
        //     children: <Traluong />,
        // },
        {
            key: '2',
            label: `Tiền khám`,
            children: <Tienkham />,
        },
    ];
    const items1: TabsProps['items'] = [
        {
            key: '1',
            label: `Tiền khám`,
            children: <Tienkham />,
        },
    ];
    return (
        <div>
           <Tabs defaultActiveKey="1" items={authUser?.role === 4 ? items1: items} onChange={onChangeTab} />
        </div>
    )
}

export default ManagerMoney