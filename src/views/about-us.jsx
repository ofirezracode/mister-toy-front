import React from 'react'
import Map from '../cmps/map'
import BouncingImg from '../assets/images/bouncing-castle.jpg'

function AboutUs() {
  return (
    <section className="about-us full view">
      <h2 className="full">About us</h2>
      <section className="about-us-text">
        <p>Welcome to our toy store, where imagination knows no bounds!</p>
        <p>
          We are passionate about providing children and families with a wide range of delightful and educational toys that inspire
          creativity and foster joyous play. Our carefully curated collection includes an enchanting array of toys, from classic favorites
          to the latest innovative creations. Whether you're seeking cuddly plush companions, mind-stimulating puzzles, imaginative building
          sets, or exciting board games, we have something for every age and interest.
        </p>
        <p>
          Our commitment to quality means you can trust that each toy has been thoughtfully chosen to ignite imagination, encourage
          learning, and bring endless smiles to little faces. With our friendly and knowledgeable staff, we are dedicated to ensuring your
          toy shopping experience is enjoyable and memorable. Discover a world of wonder and endless possibilities at our toy store, where
          cherished memories are made and childhood dreams come true.
        </p>
      </section>
      <img src={BouncingImg} alt="a bouncing castle"></img>
      <section className="about-us-branches full">
        <h3>Check out our branches</h3>
        <Map />
      </section>
    </section>
  )
}

export default AboutUs
