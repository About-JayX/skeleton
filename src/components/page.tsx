import { useParams } from 'react-router-dom'
import Button from './button'
import Web3 from 'web3'

const Page = () => {
  const { type, code, token } = useParams()
  const bindWallet = () => {
    if (type === 'erc20') {
      bindERC20Wallet()
    } else if (type === 'solana') {
      bindSolanaWallet()
    }
  }
  const sendBindRequest = async (data: any) => {
    try {
      const response = await fetch('https://tbotapi.xdex.cc/authorize-Bind/bind-wallet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token || '',
        },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (result.success) {
        alert(`${data.type.toUpperCase()} banding Success`)
      } else {
        alert(`${data.type.toUpperCase()} banding Error`)
      }
    } catch (error) {
      console.error(error)
      alert('Server error, please try again later')
    }
    window.open(`https://t.me/pidWarTest_bot/pidWar/`)
  }
  const bindERC20Wallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)

      if (window.ethereum.isMetaMask) {
        console.log('Using MetaMask')
      } else if (window.ethereum.isBitget) {
        console.log('Using Bitget Wallet')
      } else if (window.ethereum.isOkxWallet) {
        console.log('Using OKX Wallet')
      } else {
        console.log('Using an unknown Ethereum wallet')
      }

      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const accounts = await web3.eth.getAccounts()
        const address = accounts[0]

        const message = `BanDing wallet Address for ${type}, User is ${code}, Wallet Address is ${address.toLowerCase()}, Please confirm the sign`
        const signature = await web3.eth.personal.sign(message, address, '')

        sendBindRequest({ address, user: code, signature, message, type })
      } catch (error) {
        console.error(error)
      }
    } else {
      alert('Please install MetaMask, Bitget or OKX wallet')
    }
  }
  async function bindSolanaWallet() {
    try {
      const wallet = window.solana

      if (!wallet) {
        alert('Please install Solana Wallet')
        return
      }

      await wallet.connect()
      const publicKey = wallet.publicKey.toString()

      const message = `BanDing wallet Address for ${type}, User is ${code}, Wallet Address is ${publicKey.toLowerCase()}, Please confirm the sign`
      const encodedMessage = new TextEncoder().encode(message)
      const signatureObj = await wallet.signMessage(encodedMessage)

      const signature = Array.from(signatureObj.signature)

      sendBindRequest({
        address: publicKey,
        type,
        signature,
        message: Array.from(encodedMessage),
        user: code,
      })
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="flex flex-col w-screen h-screen items-center home-bg overflow-hidden">
      <div className="home-bg-1" />
      <div className="home-bg-2" />
      <div className="home-bg-3" />
      <div className="grid gap-6 justify-items-center z-10">
        <div className="pi-war-home-logo w-[14rem] h-[14rem] z-1">
          <div className="logo-1" />
          <div className="logo-2" />
          <div className="logo-3" />
        </div>
      </div>
      <div className="w-[14rem] flex-1 flex flex-col ">
        {type === 'solana' || type === 'erc20' ? (
          <Button className="mt-32" onClick={bindWallet}>
            绑定{type}钱包
          </Button>
        ) : (
          <span className="mt-32 text-center">未选择绑定链</span>
        )}
        {/* <Button>测试测</Button> */}
      </div>
    </div>
  )
}

export default Page
