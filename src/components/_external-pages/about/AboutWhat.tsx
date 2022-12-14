import faker from 'faker';
import { Icon } from '@iconify/react';
import roundArrowRightAlt from '@iconify/icons-ic/round-arrow-right-alt';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  LinearProgress,
  Divider
} from '@material-ui/core';
// utils
import { fPercent } from '../../../utils/formatNumber';
//
import { MHidden } from '../../@material-extend';
import { varFadeInUp, varFadeInRight, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const SKILLS = [
  {
    label: 'Development',
    value: faker.datatype.number({ min: 79, max: 99, precision: 0.1 })
  },
  {
    label: 'Design',
    value: faker.datatype.number({ min: 79, max: 99, precision: 0.1 })
  },
  {
    label: 'Marketing',
    value: faker.datatype.number({ min: 79, max: 99, precision: 0.1 })
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(20),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left'
  }
}));

// ----------------------------------------------------------------------

type ProgressItemProps = {
  progress: {
    label: string;
    value: number;
  };
};

function ProgressItem({ progress }: ProgressItemProps) {
  const { label, value } = progress;
  return (
    <Box sx={{ mt: 3 }}>
      <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {fPercent(value)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
          '&.MuiLinearProgress-determinate': { bgcolor: 'divider' }
        }}
      />
    </Box>
  );
}

export default function AboutWhat() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const shadow = `-40px 40px 80px ${alpha(
    isLight ? theme.palette.grey[500] : theme.palette.common.black,
    0.48
  )}`;

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <MotionInView variants={varFadeInRight}>
              <Typography color="primary.main" variant="h2" sx={{ mb: 3 }}>
                THPT CHUY??N NGUY???N B???NH KHI??M
              </Typography>
            </MotionInView>

            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}
              >
                Tr?????ng THPT chuy??n Nguy???n B???nh Khi??m (Nguyen Binh Khiem High School for the Gifted),
                l?? tr?????ng chuy??n c???a t???nh V??nh Long ???????c th??nh l???p ng??y 8/01/1992 theo Quy???t ?????nh s???
                31/Q??.TCCB c???a Gi??m ?????c S??? Gi??o d???c ????o t???o V??nh Long. Tuy???n ch???n v?? ????o t???o h???c
                sinh n??ng khi???u c???p Trung h???c ph??? th??ng c??c m??n v??n h??a, ngo???i ng??? tr??n ?????a b??n to??n
                t???nh V??nh Long.T??? n??m h???c 1992 ??? 1993 tr?????ng ???????c ?????i t??n th??nh tr?????ng THPT chuy??n
                Nguy???n B???nh Khi??m theo Quy???t ?????nh s??? 246/UBT ng??y 29 th??ng 7 n??m 1992 c???a Ch??? t???ch
                UBND t???nh V??nh Long.
              </Typography>
            </MotionInView>
            {/* <Divider sx={{ my: 2, mx: 'auto', height: 10 }} /> */}
            <br />
            <MotionInView variants={varFadeInRight}>
              <Typography
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light' ? 'text.secondary' : 'common.white'
                }}
              >
                N??m h???c ?????u ti??n 1991 ??? 1992, tr?????ng ch??? c?? 60 h???c sinh c???a 3 l???p 10 chuy??n v?? 08
                c??n b???, gi??o vi??n, c??ng nh??n vi??n, c?? s??? v???t ch???t t???m b??? ???????c gh??p chung v???i Trung
                t??m h?????ng nghi???p d???y ngh??? c???a t???nh. N??m h???c 1992 ??? 1993 ???????c chuy???n sang d??ng chung
                c?? s??? v???i tr?????ng B??? t??c v??n h??a t???i ch???c t???nh, n??m h???c n??y tr?????ng ???? ph??t tri???n ???????c
                13 l???p (c?? c??? h??? THCS). T??? n??m h???c 1996 ??? 1997, tr?????ng ???????c t??ch ri??ng ra v?? chuy???n
                v??? c?? s??? m???i (do tr?????ng Cao ?????ng s?? ph???m V??nh Long ????? l???i), b???y gi??? ch??? c?? 1 khu h???c
                t???p g???m 18 ph??ng h???c, chung quanh to??n l?? ?????t ru???ng, n???n th???p, lu??n ch???u ???nh h?????ng
                c???a tri???u c?????ng. Sau 25 n??m th??nh l???p, c?? s??? v???t ch???t ???????c n??ng c???p, nh?? tr?????ng ????
                c?? ?????i ng?? 116 c??n b???, gi??o vi??n, nh??n vi??n v?? t???p th??? 27 l???p v???i 894 h???c sinh.
                Tr?????ng ???? ?????t ???????c c??c ti??u chu???n quy ?????nh ?????i v???i m???t tr?????ng THPT ?????t chu???n qu???c
                gia.
              </Typography>
            </MotionInView>

            {/* <MotionInView variants={varFadeInRight}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                endIcon={<Icon icon={roundArrowRightAlt} width={24} height={24} />}
              >
                Check out our work
              </Button>
            </MotionInView> */}
          </Grid>
          <MHidden width="mdDown">
            <Grid item xs={12} md={6} lg={6} sx={{ pr: { md: 7 } }}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      component="img"
                      src="/static/about/about_image.jpg"
                      sx={{
                        borderRadius: 2,
                        boxShadow: shadow
                      }}
                    />
                  </MotionInView>
                </Grid>
                <Grid item xs={6}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      width="maxWidth"
                      component="img"
                      src="/static/about/about_image_3.jpg"
                      sx={{ borderRadius: 2 }}
                    />
                  </MotionInView>
                </Grid>
                <Grid item xs={6}>
                  <MotionInView variants={varFadeInUp}>
                    <Box
                      width="maxWidth"
                      component="img"
                      src="/static/about/about_image_2.jpg"
                      sx={{ borderRadius: 2 }}
                    />
                  </MotionInView>
                </Grid>
              </Grid>
            </Grid>
          </MHidden>
        </Grid>
      </Container>
    </RootStyle>
  );
}
