import { Button, CardActions, CardContent, CircularProgress, Typography } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/SideBar';
import useCallAPITest from '../../hooks/useCallAPITest'
import { RootState } from '../../store/store';

function TestPage() {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();

  const { data, isLoading } = useCallAPITest();
  const navigate = useNavigate();
  return (
    <div className='home_page'>
      <SideBar />
      <Button onClick={() => navigate('login')}>Login</Button>
      {isLoading ? <CircularProgress /> : 
        <div>
          {data && data.map((item: any,index: number) => (
            <div key={index}>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" component="div">
                    {item.dates}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.duties}
                  </Typography>
                  <Typography variant="body2">
                    {item.company}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
            </div>
          ))}
        </div>}
      <h1>{t("title")}</h1>
    </div>
  )
}

export default TestPage