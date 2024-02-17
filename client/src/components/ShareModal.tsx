import { useAppDispatch, useAppSelector } from '../hooks/useReduxHooks'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { setShareModalClose } from '../app/shareModalSlice'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'

const ShareModal = () => {
  const { isOpen, postId } = useAppSelector((state) => state.shareModal)
  const dispatch = useAppDispatch()

  const link = window.location.href.includes('post') ? window.location.href : `${window.location.origin}/post/${postId}`
  console.log(link)
  return (
    <Modal isOpen={isOpen} onClose={() => dispatch(setShareModalClose())}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Share</ModalHeader>
        <ModalBody display='flex' justifyContent='space-around' pb={4}>
          <TwitterShareButton url={link} aria-label='Share X'>
            <XIcon size={48} />
          </TwitterShareButton>
          <FacebookShareButton url={link} aria-label='Share Facebook'>
            <FacebookIcon size={48} />
          </FacebookShareButton>
          <EmailShareButton url={link} aria-label='Share Email'>
            <EmailIcon size={48} />
          </EmailShareButton>
          <RedditShareButton url={link} aria-label='Share Reddit'>
            <RedditIcon size={48} />
          </RedditShareButton>
          <TelegramShareButton url={link} aria-label='Share Telegram'>
            <TelegramIcon size={48} />
          </TelegramShareButton>
          <WhatsappShareButton url={link} aria-label='Share Whatsapp'>
            <WhatsappIcon size={48} />
          </WhatsappShareButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShareModal
