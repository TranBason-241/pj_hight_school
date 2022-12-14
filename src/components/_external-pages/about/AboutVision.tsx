// material
import { Box, Container, Typography, Grid } from '@material-ui/core';
//
import { varFadeInUp, varFadeIn, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container maxWidth="lg" sx={{ mt: 0 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          // boxShadow: shadow,
          overflow: 'hidden'
        }}
      >
        <Box
          component="img"
          src="/static/about/about_image.jpg"
          sx={{
            borderRadius: 2
          }}
        />

        {/* <Box
          sx={{
            bottom: { xs: 24, md: 80 },
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center'
          }}
        >
          {['logo_amazon', 'logo_hbo', 'logo_ibm', 'logo_lya', 'logo_spotify', 'logo_netflix'].map(
            (logo) => (
              <MotionInView key={logo} variants={varFadeIn}>
                <Box
                  component="img"
                  src={`/static/about/${logo}.svg`}
                  sx={{ m: { xs: 1.5, md: 5 }, height: { xs: 24, md: 40 } }}
                />
              </MotionInView>
            )
          )}
        </Box> */}
      </Box>

      {/* <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFadeInUp}>
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              Thêm vài cái gì đó ở đây
            </Typography>
          </MotionInView>
        </Grid>
      </Grid> */}
    </Container>
  );
}
