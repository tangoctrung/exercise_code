import Header from '../../components/Header';
import HomeIntroduction from "../../../assets/images/home_introduction.png";
import HomeSpeciality from "../../../assets/images/home_speciality.png";
import { Button, InputLabel } from '@mui/material';
import { IconHomeDoctor } from '../../components/Icons/IconHomeDoctor';
import { IconHomeCilinic } from '../../components/Icons/IconHomeCilinic';
import { IconHomeSpecialist } from '../../components/Icons/IconHomeSpecialist';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardInfoDoctor from './component/CardInfoDoctor';
import CardReview from './component/CardReview';
import CardCilinic from './component/CardCilinic';
import { LogoApp } from '../../components/Icons/LogoApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LayoutHomePage from '../../components/Layout/LayoutHomePage';
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

function HomePage() {


  return (
    <div className='home_page'>
      <LayoutHomePage>
        <div className='home_page-header'>
          <Header />
        </div>

        <div id="introduction" className='home_page-background'>
          <div className='home_page-background-top'>
            <div className='home_page-background-top-left'>
              <h2>Chuỗi phòng khám eClinics</h2>
              <span>Đây là một hệ thống quản lý các chuỗi phòng khám của tư nhân.</span>
              <div>
                <span>Thêm thông tin</span>
                <Button variant='contained' color='success'>Đăng ký</Button>
              </div>
            </div>
            <div className='home_page-background-top-right'>
              <img src={HomeIntroduction} alt="bg" />
            </div>
          </div>
          <div className='home_page-background-bottom'>
            <div className='home_page-background-bottom-listInfo'>
              <div className='itemInfo'>
                <div className='itemInfo-left'>
                  <div>
                    <IconHomeDoctor className='iconDoctor' />
                  </div>
                  <div className='itemInfo-left-text'>
                    <p>+60</p>
                    <span>Bác sĩ</span>
                  </div>
                </div>
                <div className='itemInfo-right'>
                  <span>Những bác sĩ được tuyển dụng đều có kinh nghiệm lâu năm, chuyên môn cao. </span>
                </div>
              </div>

              <div className='itemInfo'>
                <div className='itemInfo-left'>
                  <div>
                    <IconHomeCilinic className='iconCilinic'/>
                  </div>
                  <div className='itemInfo-left-text'>
                    <p>+10</p>
                    <span>Cơ sở</span>
                  </div>
                </div>
                <div className='itemInfo-right'>
                  <span>Hệ thống có tới 11 cơ sở trên khắp cả nước, để phục vụ cho mọi người bệnh. </span>
                </div>
              </div>

              <div className='itemInfo'>
                <div className='itemInfo-left'>
                  <div>
                    <IconHomeSpecialist className='iconCilinic'/>
                  </div>
                  <div className='itemInfo-left-text'>
                    <p>+20</p>
                    <span>Dịch vụ</span>
                  </div>
                </div>
                <div className='itemInfo-right'>
                  <span>Cung cấp hơn 20 dịch vụ khám chữa bệnh cho người dân. </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="facilities" className='home_page-facilities'>
          <div className='facilities-layout'>
            <div className='facilities-content'>
              <div className='content_text'>
                <h2>Cơ sở vật chất</h2>
                <span>Mỗi phòng khám sẽ được cung cấp những thiết bị tân tiến nhất để phục vụ cho mỗi người dân.</span>
              </div>
              <div className='content_seeAllMore'>
                <p>Xem thêm  <ArrowForwardIcon style={{ marginLeft: "10px", fontSize: "inherit"}} /></p>
              </div>
            </div>
            <div className='facilities-listItem'>
              <div className='facilities-item relative'>
                <div className='facilities-item-img'>
                  <img src="https://media.istockphoto.com/id/1162890852/vi/anh/n%E1%BB%99i-th%E1%BA%A5t-ph%C3%B2ng-m%E1%BB%95-trong-ph%C3%B2ng-kh%C3%A1m-hi%E1%BB%87n-%C4%91%E1%BA%A1i.jpg?s=612x612&w=0&k=20&c=rpuagm1klWmQnhc031qo-XfqF8u1tIMCItDPOGfvomo=" alt="" />
                </div>
                <div className='facilities-item-text mb-[30px]'>
                  <h3>Bàn mổ</h3>
                  <p>Đây là thiết bị để người bệnh nằm lên và tiến hành các cuộc phẫu thuật.</p>
                </div>
                <div  className='facilities-item-button absolute bottom-0 right-0'>
                  <Button 
                    variant='contained' style={{backgroundColor: 'rgb(46,125,50)', borderTopLeftRadius: "24px"}}>
                      CHI TIẾT
                  </Button>
                </div>
              </div>
              <div className='facilities-item relative'>
                <div className='facilities-item-img'>
                  <img src="https://vietmed.vn/Uploads/images/product/Noi%20soi/HD550/HD550-02.jpg" alt="" />
                </div>
                <div className='facilities-item-text'>
                  <h3>Máy nội soi</h3>
                  <p>Thiết bị này dùng để nội soi dạ dày.</p>
                </div>
                <div  className='facilities-item-button absolute bottom-0 right-0'>
                  <Button variant='contained' style={{backgroundColor: 'rgb(46,125,50)', borderTopLeftRadius: "24px"}}>CHI TIẾT</Button>
                </div>
              </div>
              <div className='facilities-item relative'>
                <div className='facilities-item-img'>
                  <img src="https://meditop.com.vn/upload/images/Ghe%20may%20nha%20khoa%20HK-620A%20copy.jpg" alt="" />
                </div>
                <div className='facilities-item-text'>
                  <h3>Ghế khám răng</h3>
                  <p>Ghế này dùng để cho người có bệnh về răng ngồi lên để khám.</p>
                </div>
                <div  className='facilities-item-button absolute bottom-0 right-0'>
                  <Button variant='contained' style={{backgroundColor: 'rgb(46,125,50)', borderTopLeftRadius: "24px"}}>CHI TIẾT</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id='speciality' className="home_page-speciality">
          <div className='speciality-left'>
            <h2>Chuyên môn phòng khám</h2>
            <p>Hệ thống cung cấp nhiều dịch vụ khám khác nhau và được thực hiện bởi các bác sĩ có tay nghề cao.</p>
            <div className='list-button'>
              <div className='item-button'>
                <Button variant='outlined'>Khám răng</Button>
                <Button variant='outlined'>Khám tai mũi họng</Button>
                <Button variant='outlined'>Khám mắt</Button>
              </div>
              <div className='item-button'>
                <Button variant='contained'>Xét nghiệm máu</Button>
                <Button variant='contained'>Nội soi dạ dày</Button>
                <Button variant='contained'>Chụp X quang</Button>
              </div>
              <div className='item-button'>
                <Button variant='outlined'>Khám da liễu</Button>
                <Button variant='outlined'>Xét nghiệm ung thư</Button>
                <Button variant='outlined'>Khám tổng quát</Button>
              </div>
            </div>
          </div>
          <div className='speciality-right'>
            <img src={HomeSpeciality} alt="bg" />
          </div>
        </div>

        <div id='askDoctos' className="home_page-askDoctos">
          <div className='askDoctos-layout'>
            <div className='askDoctos-menu'>
              <h2>Hỏi đáp</h2>
              {/* <div className='listMenu'>
                <div className='itemMenu itemMenu-focus'>
                  <p>All</p>
                </div>
                <div className='itemMenu'>
                  <p>Orthopedic</p>
                </div>
                <div className='itemMenu'>
                  <p>Nutritionist</p>
                </div>
                <div className='itemMenu'>
                  <p>Pediatric</p>
                </div>
                <div className='itemMenu'>
                  <p>Anaesthestic</p>
                </div>
              </div> */}
            </div>
            <div className='askDoctos-list'>
              <CardInfoDoctor />
              <CardInfoDoctor />
              <CardInfoDoctor />
              <CardInfoDoctor />
              <CardInfoDoctor />
              <CardInfoDoctor />
            </div>
          </div>
        </div>

        <div id='review' className="home_page-review">
          <div className='review-layout'>
            <div>
              <h2>Đánh giá của người bệnh</h2>
              <p>Đây là những nhận xét và đánh giá của người bệnh khi đến khám ở các cơ sở của chúng tôi.</p>
            </div>
            <div className='review-list'>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
                <SwiperSlide> <CardReview /> </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>

        <div id='cilinics' className="home_page-cilinics">
          <div className='cilinics-layout'>
            <div>
              <h2>Thông tin về cơ sở</h2>
              <p>Dưới đây là một số cơ sở chính của chúng tôi.</p>
            </div>
            <div className='cilinics-list'>
              <CardCilinic />
              <CardCilinic />
              <CardCilinic />
              <CardCilinic />
              <CardCilinic />
              <CardCilinic />
            </div>
          </div>
        </div>

        <div id='footer' className='home_page-footer'>
          <div className='footer-layout'>
            <div className='footer-left'>
              <div className='footer-left-logo'>
                <LogoApp />
                <h2>eClinics</h2>
              </div>
              <p>Nam posuere accumsan porta. Integer id tincidunt sit amet sed libero.</p>
              <p>© Skyrev Theme 2022</p>
            </div>
            <div className='footer-middle'>
              <div className='footer-middle-item'>
                <p>COMPANY</p>
                <span>Donec dignissim</span>
                <span>Curabitur egestas</span>
                <span>Nam posuere</span>
                <span>Aenean facilisis</span>
              </div>
              <div  className='footer-middle-item'>
                <p>COMPANY</p>
                <span>Donec dignissim</span>
                <span>Curabitur egestas</span>
                <span>Nam posuere</span>
                <span>Aenean facilisis</span>
              </div>
            </div>
            <div className='footer-right'>
              <div className='footer-listSocial'>
                <div>
                  <FacebookIcon style={{ color: "#3ebff4", fontSize: "32px", marginRight: '28px' }} />
                </div>
                <div>
                  <LinkedInIcon style={{ color: "#3ebff4", fontSize: "32px", marginRight: '28px' }} />
                </div>
                <div>
                  <TwitterIcon style={{ color: "#3ebff4", fontSize: "32px", marginRight: '28px' }} />
                </div>
                <div>
                  <PhotoCameraIcon style={{ color: "#3ebff4", fontSize: "32px", marginRight: '28px' }} />
                </div>
              </div>
              <div className='footer-swtichLanguage'>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" size='small'>Language</InputLabel>
                <Select
                  size='small'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Vietnam - vi</MenuItem>
                  <MenuItem value={20}>English - en</MenuItem>
                </Select>
              </FormControl>
              </div>
            </div>
          </div>
        </div>
      </LayoutHomePage>

    </div>
  )
}

export default HomePage