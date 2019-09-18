import React, { useCallback } from 'react'
import {
  Modal,
  Carousel,
  CarouselItem,
  CarouselControl,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'
import Img from 'gatsby-image'

const GalleryModal = ({ image, setModalOpen, isOpen, prev, next }) => {
  const toggle = useCallback(() => {
    setModalOpen(!isOpen)
  }, [isOpen, setModalOpen])
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader tag="h3" toggle={toggle}>
        {image.title}
      </ModalHeader>
      <ModalBody>
        <Carousel activeIndex={0} previous={prev} next={next} interval={false}>
          {[
            <CarouselItem key={0}>
              <Img
                fluid={image.src.childImageSharp.big}
                alt={image.description || image.title}
              />
            </CarouselItem>,
          ]}
          <CarouselControl
            onClickHandler={prev}
            direction="prev"
            directionText="Previous"
          />
          <CarouselControl
            onClickHandler={next}
            direction="next"
            directionText="Next"
          />
        </Carousel>
        <p className="my-3">{image.description}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default GalleryModal
