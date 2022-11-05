import faker from 'faker';
import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Icon } from '@iconify/react';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import { DialogProps } from '@material-ui/core/Dialog';
import { dispatch, RootState } from 'redux/store';
import { getListNew } from 'redux/slices/new';
import { getListTeacher } from 'redux/slices/teacher';
// material
import { useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Container,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Grid
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { fontStyle } from '@material-ui/system';

//
import { Teacher } from '../../@types/teacher';
import { varFadeIn, varFadeInUp, MotionInView, varFadeInDown } from '../animate';
import { CarouselControlsArrowsBasic2 } from '../carousel';

type teacherCardProps = {
  teacher: Teacher;
};

type Member = {
  id: string;
  name: string;
  imageUrl: string;
  dateOfBirth: string;
  cityId: string;
  startTime: string;
  endTime: string;
  email: string;
  phone: string;
};
function TeacherCard({ teacher }: teacherCardProps) {
  const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
    teacher;
  return (
    <Box>
      <Card key={name} sx={{ p: 1, mx: 1.5 }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          Dạy môn gì
        </Typography>
        <Box component="img" src={imageUrl} sx={{ width: '100%', borderRadius: 1.5 }} />
        <Box sx={{ mt: 2, mb: 1 }}>
          {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
            <IconButton key={index}>
              <Icon icon={social} width={20} height={20} />
            </IconButton>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

type PersonCardProps = {
  member: Member;
};

function PersonCard({ member }: PersonCardProps) {
  const { name, imageUrl, dateOfBirth } = member;
  return (
    <Box onClick={() => alert('sss')}>
      <Card key={name} sx={{ p: 1, mx: 1.5 }}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {dateOfBirth}
        </Typography>
        <Box component="img" src={imageUrl} sx={{ width: '100%', borderRadius: 1.5 }} />
        <Box sx={{ mt: 2, mb: 1 }}>
          {[facebookFill, instagramFilled, linkedinFill, twitterFill].map((social, index) => (
            <IconButton key={index}>
              <Icon icon={social} width={20} height={20} />
            </IconButton>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

type teacherSliderProps = {
  teacherList: Teacher[];
};

type InfoDialogProps = {
  teacher: Teacher;
  handleClose: () => void;
  open: boolean;
  //   item?: Item;
};

function InfoDialog({ handleClose, open, teacher }: InfoDialogProps) {
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  // const { id, name, dateOfBirth, cityId, imageUrl, email, phone, startTime, endTime, isAlive } =
  //   teacher!;
  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Box sx={{ width: '100%' }}>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        {/* <DialogTitle sx={{ pb: 2 }}>{teacher?.name}</DialogTitle> */}
        <DialogContent sx={{ width: '100%' }} dividers={scroll === 'paper'}>
          <Box sx={{ height: '30%', mt: 3 }}>
            <Grid container spacing="30">
              <Grid item md={4}>
                <Box
                  component="img"
                  src="/static/about/avatar-1.jpg"
                  sx={{ width: '100%', height: '90%', borderRadius: 3 }}
                  display="center"
                />
                <Grid sx={{ mt: 2 }} container justifyContent="center">
                  <Typography align="center" variant="body1" sx={{ color: 'text.secondary' }}>
                    Sống một lần rồi chêt có gì đâu mà sợ Sống một lần rồi chêt có gì đâu mà sợ
                  </Typography>
                </Grid>
              </Grid>
              <Grid item md={8}>
                <Box>
                  <Typography variant="h2" sx={{ color: 'black', mb: 5 }}>
                    {teacher?.name}
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Ngày sinh: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {teacher?.dateOfBirth}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Email: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {teacher?.email}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Phone: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      {teacher?.phone}
                    </Typography>
                  </Typography>

                  <Typography variant="h5" sx={{ color: 'black', fontStyle: 'aria', mb: 1 }}>
                    Phụ trách môn học: &nbsp;
                    <Typography component="span" variant="subtitle1">
                      Toán, Lý, Hóa
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>

          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function TeacherSlider({ teacherList }: teacherSliderProps) {
  const theme = useTheme();
  const carouselRef = useRef<Slider>(null);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher>();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const settings = {
    speed: 500,
    slidesToShow: 2,
    centerMode: true,
    centerPadding: '0 80px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <InfoDialog open={open} teacher={currentTeacher!} handleClose={handleClose} />
      <Slider ref={carouselRef} {...settings}>
        {teacherList.map((teacher: Teacher) => (
          <MotionInView key={teacher.id} variants={varFadeIn}>
            <Box
              onClick={() => {
                setCurrentTeacher(teacher);
                handleOpen();
              }}
            >
              <TeacherCard teacher={teacher} />
            </Box>
          </MotionInView>
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
        sx={{ transform: 'translateY(-64px)' }}
      />
    </Box>
  );
}
