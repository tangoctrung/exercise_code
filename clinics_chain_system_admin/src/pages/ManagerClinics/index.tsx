import { Tabs, TabsProps } from 'antd'
import React from 'react'
import FormServices from './components/FormServices';
import FormBranch from './components/FormBranch';

function ManagerClinics() {

    const onChange = (key: string) => {
        console.log(key);
      };
    
      const items: TabsProps['items'] = [
        {
          key: '1',
          label: `Thêm dịch vụ`,
          children: <FormServices />,
        },
        {
          key: '2',
          label: `Tạo chi nhánh`,
          children: <FormBranch />,
        },
      ];

  return (
    <div className='flex justify-center mt-[100px]'>
        <div className='admin  w-[400px] p-[20px] bg-[#f5f5f5] rounded-lg shadow-md'>
            <h2 className='text-center mb-[20px]'>Quản lý phòng khám</h2>
            <div>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </div>
    </div>
  )
}

export default ManagerClinics