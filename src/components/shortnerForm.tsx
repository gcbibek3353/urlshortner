'use client'
import React, { useState } from 'react'
import { Label} from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { postUrlAction } from '@/actions/url'
import { toast } from 'sonner'
import Link from 'next/link'
import { Copy } from 'lucide-react'

const shortnerForm = () => {
    const [shortUrl, setShortUrl] = useState("");
    const [details, setDetails] = useState({
        url: "",
        shortUrl: ""
    });

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails((prevDetails) => ({ ...prevDetails, [e.target.id]: e.target.value }))
    }
    const handlesubmit = async () => {
        try {
            const res = await postUrlAction(details);
            if (!res.success) {
                toast.error(res.message);
            } else {
                setShortUrl(res.data?.shortUrl);
                toast.success(res.message);
            }
            setDetails({
                url: "",
                shortUrl: ""
            });
        } catch (error) {
            console.log("error message" + error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Enter your URL
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="url" className="block text-sm font-medium text-gray-700">
                URL:
              </Label>
              <Input
                id="url"
                type="text"
                placeholder="Enter URL"
                onChange={(e) => changeHandler(e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="shortUrl" className="block text-sm font-medium text-gray-700">
                Short URL:
              </Label>
              <Input
                id="shortUrl"
                type="text"
                placeholder="Enter Short URL"
                onChange={(e) => changeHandler(e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <Button
              onClick={() => handlesubmit()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Generate
            </Button>
          </div>
          {shortUrl
           && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-between">
              <span className="text-gray-700 font-medium">Your Short Link: </span>
              <Link
              target='_blank'
                href={`/${shortUrl}`}
                className="text-indigo-600 hover:underline break-words"
              >
                {process.env.NEXT_PUBLIC_URL + "/" + shortUrl}
              </Link>
              <Copy onClick={()=>{
                navigator.clipboard.writeText(process.env.NEXT_PUBLIC_URL + "/" + shortUrl);
                toast.success("Link copied");
              }} className='cursor-pointer rounded-md text-sm shadow-md' />
            </div>
          )
          }
        </div>
      </div>
      
    )
}

export default shortnerForm
