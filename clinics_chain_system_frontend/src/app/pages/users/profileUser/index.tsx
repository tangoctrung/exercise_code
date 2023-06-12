import React from "react";
import Header from "../../../components/Header";
import TimeLineUser from "./components/timeline";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import Profile from "./components/profile";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardDoctor from "./components/cardDoctor";
import CardRateDoctor from "./components/ListRateDoctor/component/CardRateDoctor";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import useGetInfoUser from "../../../hooks/useGetInfoUser";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useGetBranchs from "../../../hooks/useGetBranchs";
import useGetListDoctor from "../../../hooks/useGetListDoctor";
import { IMAGE_DEFAULT } from "../../../constant";
import useGetServicesType from "../../../hooks/useGetServicesType";
import useGetListFeedbacks from "../../../hooks/useGetListFeedbacks";
import ListRateDoctor from "./components/ListRateDoctor";

function ProfileUser() {
  const [expanded, setExpanded] = React.useState<string>("panel1");
  const [value, setValue] = React.useState<DateRange<Dayjs>>([null, null]);
  const [valueBranch, setValueBranch] = React.useState('');
  const { profileUser } = useSelector((state: RootState) => state.user);

  const { data } = useGetInfoUser();
  const { dataServices } = useGetServicesType();
  const { dataDoctors } = useGetListDoctor(valueBranch);
  const { dataFeedbacks } = useGetListFeedbacks();

  const { dataBranchs } = useGetBranchs();

  const handleSwitchTab = (panel: string)  => {
    setExpanded(panel);
  };

  const handleChangeBranch = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    
    setValueBranch(event.target.value);
  };

  return (
    <div className="layout py-24 px-16">
      <div>
        {" "}
        <Header />{" "}
      </div>
      <div className="mb-5">
        <h2>Trang thông tin người dùng</h2>
      </div>
      <div className="flex">
        <div className="profileUser_left mr-10">
          <div className="profileUser_left_avatar h-40 w-40">
            <img
              src={profileUser?.avatarUrl || IMAGE_DEFAULT}
              alt=""
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="profileUser_left_info mt-4 flex flex-col justify-center items-center">
            <h2>{profileUser?.firstName + " " + profileUser?.lastName || <b>Chưa có thông tin</b>}</h2>
            <p>{profileUser?.dateOfBirth ? dayjs(profileUser?.dateOfBirth).format("DD/MM/YYYY") : <b>Chưa có thông tin</b>}</p>
          </div>
        </div>
        <div className="profileUser_right ml-10 w-full p-4 bg-slate-100 min-h-[400px]">
          <div className="flex justify-evenly">
            <div className="flex items-center justify-center cursor-pointer py-2 px-6 rounded-lg"
              style={{ backgroundColor: expanded==="panel1" ? "rgb(220,220,220)" : "" }}
              onClick={() => handleSwitchTab("panel1")}
            >
              <AccountBoxRoundedIcon />
              <p className="text-lg font-semibold ml-[10px]">Tiểu sử</p>
            </div>
            <div  className="flex items-center justify-center cursor-pointer py-2 px-6 rounded-lg"
              style={{ backgroundColor: expanded==="panel2" ? "rgb(220,220,220)" : "" }}
              onClick={() => handleSwitchTab("panel2")}
            >
              <StorageRoundedIcon />
              <p className="text-lg font-semibold ml-[10px]">Đặt lịch khám</p>
            </div>
            <div  className="flex items-center justify-center cursor-pointer py-2 px-6 rounded-lg"
              style={{ backgroundColor: expanded==="panel3" ? "rgb(220,220,220)" : "" }}
              onClick={() => handleSwitchTab("panel3")}
            >
              <HistoryRoundedIcon />
              <p className="text-lg font-semibold ml-[10px]">Lịch sử khám</p>
            </div>
            <div  className="flex items-center justify-center cursor-pointer py-2 px-6 rounded-lg"
              style={{ backgroundColor: expanded==="panel4" ? "rgb(220,220,220)" : "" }}
              onClick={() => handleSwitchTab("panel4")}
            >
              <ReviewsRoundedIcon />
              <p className="text-lg font-semibold ml-[10px]">Đánh giá</p>
            </div>
          </div>

          <div className="mt-[20px] flex justify-center">
            { expanded === "panel1" && <div className="w-[70%]"><Profile dataProfile={profileUser} /> </div>}
            { expanded === "panel2" && 
              <div className="w-full">
                <div className="ml-[120px]">
                  <FormControl sx={{ m: 1, minWidth: 240 }} size="small">
                      <InputLabel id="demo-select-small">Chọn chi nhánh</InputLabel>
                      <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          value={valueBranch}
                          label="Chọn chi nhánh"
                          onChange={handleChangeBranch}
                      >
                        {dataBranchs && dataBranchs?.map((item:any, index:number) => 
                          <MenuItem key={index} value={item?.id}>{item?.branchName}</MenuItem>
                        )}
                        <MenuItem key={"id"} value={""}>Tất cả</MenuItem>
                      </Select>
                  </FormControl>
                </div>
                <div className="flex flex-wrap justify-center">
                  {dataDoctors && dataDoctors?.map((item:any, index:number) => (
                    <CardDoctor key={index} dataProfile={item} dataServices={dataServices} />
                  ))}
                </div>
              </div>}
            { expanded === "panel3" && 
              <div className="w-full px-[20px]">
                <div className="">
                  {/* <p className="mb-2 font-semibold">Tìm theo ngày</p>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={{ start: 'Check-in', end: 'Check-out' }}
                  >
                    <DateRangePicker
                      value={value}
                      onChange={(newValue: any) => {
                        setValue(newValue);
                      }}
                      renderInput={(startProps: any, endProps:any) => (
                        <React.Fragment>
                          <TextField {...startProps} size="small" />
                          <Box sx={{ mx: 2 }}> to </Box>
                          <TextField {...endProps} size="small" />
                        </React.Fragment>
                      )}
                    />
                  </LocalizationProvider> */}
                </div>
                <TimeLineUser />  
              </div>}
            { expanded === "panel4" && 
              <div className="">
                <div className="flex flex-wrap justify-center">
                  <ListRateDoctor />
                </div>
              </div>}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
