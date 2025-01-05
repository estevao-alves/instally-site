import {NextResponse} from "next/server";
import ogScraper from "open-graph-scraper";

export async function POST(request: Request) {
    try {
        const {site} = await request.json();

        const options = {url: site};

        const {error, html, result, response} = await ogScraper(options);
        console.log(response)

        if (error || !result.success) throw error;

        var image = null;

        if (result) {
            const {ogImage} = result;
            if (ogImage && ogImage[0]) image = ogImage[0].url;
        }

        return NextResponse.json({image});
    } catch (e) {
        return NextResponse.json({image: null, error: e});
    }
}