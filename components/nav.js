import { Flex, Heading, Image, Box } from 'theme-ui'
import { motion, useViewportScroll, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Link from 'next/link'
import { registrationState, closed } from '../lib/waitlist'

export const Nav = () => {
  const { scrollYProgress } = useViewportScroll()
  const controls = useAnimation()
  useEffect(
    () =>
      scrollYProgress.onChange(latest => {
        if (latest > 0.1) {
          controls.start({
            opacity: 1,
            transition: { duration: 0.5 },
          })
        }
        if (latest == 0) {
          controls.start({
            opacity: 0,
            transition: { duration: 0.5 },
          })
        }
      }),
    [],
  )
  return (
    <motion.div
      id="nav"
      style={{
        background: 'white',
        backgroundImage:
          'linear-gradient(90deg, rgba(5, 11, 20, 0.7) 0%, rgba(5, 11, 20, 0.7) 100% ), url(patterns/black.png)',
        backgroundSize: '70px',
        color: 'white',
        alignItems: 'center',
        gap: '16px',
        padding: '4px 16px',
        position: 'fixed',
        top: 0,
        zIndex: 999,
        width: '100%',
        display: 'flex',
        opacity: 0,
      }}
      animate={controls}
    >
      <Heading
        p={2}
        target="_blank"
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          color: 'white',
          textAlign: 'left',
        }}
        className="navMainLink"
      >
        <Link href="#letter">
          <Image
            src="/invert.png"
            height="32px"
            sx={{ height: '32px', cursor: 'pointer' }}
          />
        </Link>
        <Link href="#letter">ASSEMBLE</Link>
      </Heading>
      <Link href="#features">
        <Heading
          as="h3"
          sx={{
            cursor: 'pointer',
            display: ['none', 'block'],
            fontSize: [null, '16px', '20px'],
          }}
        >
          The Hackathon
        </Heading>
      </Link>
      <Link href="#rundown">
        <Heading
          as="h3"
          sx={{
            cursor: 'pointer',
            display: ['none', 'block'],
            fontSize: [null, '16px', '20px'],
          }}
        >
          The Rundown
        </Heading>
      </Link>
      <Box
        as="a"
        href={!closed ? '/register' : 'javascript:void(0)'}
        target={!closed ? '_blank' : '_self'}
        sx={{ color: 'white', textDecoration: 'none' }}
      >
        <Heading
          as="h3"
          p={2}
          bg={!closed ? 'green' : 'gray'}
          sx={{
            borderRadius: '4px',
            cursor: !closed ? 'pointer' : 'default',
            fontSize: [null, '16px', '20px'],
          }}
        >
          {
            {
              open: 'Register',
              waitlist: 'Join the Waitlist',
              closed: 'Registration Closed',
            }[registrationState]
          }
        </Heading>
      </Box>
    </motion.div>
  )
}
