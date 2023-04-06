import prisma from "@/utils/connectDB";


export default function ShortIdPage() {
    return (
        <div>URL Shortened</div>
    )
}

export async function getServerSideProps({ params }) {
    const { shortId } = params;
    const data = await prisma.link.findUnique({
        where: {
            shortUrl: shortId
        }
    })

    if(!data) {
        console.log("No data found")
        return { redirect: { destination: '/' } }
    } 

    if(data.url) {
        console.log("URL:", data.url)
        return { redirect: { destination: data.url } }
    }

}