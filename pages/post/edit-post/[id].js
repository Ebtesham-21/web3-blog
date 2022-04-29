
import { contractAddress } from '../../config'
import Blog from '../../artifacts/contracts/Blog.sol/Blog.json'

const ipfsURI = 'https://ipfs.io/ipfs/'
const client = create('https://ipfs.infura.io:5001/api/v0')

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    {ssr: false}
)

export default function Post() {
    const[post, setPost] = useState(null)
    const[editing, setEditing] = useState(true)
    const router = useRouter()
    const{ id } = router.query

    useEffect(() => {
        fetchPost()
    }, [id])
    async function fetchPost() {
        /* we first fetch the individual post by ipfs hash from the network */
        if(!id) return
        let provider
        if(process.env.NEXT_PUBLIC_ENVIORNMENT === 'local') {
            provider = new ethers.providers.JsonRpcProvider()
        } else if (process.env.NEXT_PUBLIC_ENVIORNMENT === 'testnet') {
            provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
        } else {
            provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
        }

        const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
        const val = await contract.fetchPost(id)
        const postId = val[0].toNumber()

        /* next we fetch the IPFS metadata from the network */
        const ipfsURL = `${ipfsURI}/${id}`
        const response = await fetch(ipfsUrl)
        const data = await response.json()
        if(data.coverImage) {
            let coverImagePath = `${ipfsURI}/${data.coverImage}`
            data.coverImagePath = coverImagePath
        }
        /* finally we append the post ID to the post data */
        /* we need this ID to make updates to the post */
        data.id = postId;
        setPost(data)
    }
}
    
