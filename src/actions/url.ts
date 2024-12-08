"use server"
import prisma from "@/db"
import { url } from "inspector"

export const postUrlAction = async ({ url, shortUrl }: { url: string, shortUrl: string }) => {
        
    try {
        const existingUrl = await prisma.url.findFirst({
            where : {
                shortUrl : shortUrl
            }
        })
        if(existingUrl) return{
            success: false,
            message: "This short Url already exists !! Please change the shortUrl and try again"
        }
        console.log('dont log this ');
        
        const res = await prisma.url.create({
            data: { url, shortUrl }
        })
        if (!res) return {
            success: false,
            message: "Unable to create the shortUrl and unable to save data in a database"
        }
        return {
            success : true,
            message : "short url created Successfully",
            data : res
        }
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: "Unable to create the shortUrl"
        }
    }
}

export const getUrlAction = async ({shortUrl} : {shortUrl : string}) =>{
    try {
        const res = await prisma.url.findFirst({
            where : {
                shortUrl
            }
        });

        if(!res) return {
            success : false,
            message : "No Link exist to this shortUrl"
        }
        return {
            success : true,
            message : "Link for given shortUrl found successfully",
            url : res.url
        }

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Unable to get the Url for this shortUrl"
        }
    }
}