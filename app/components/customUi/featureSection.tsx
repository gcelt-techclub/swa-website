'use client';

import React from 'react'

interface featureProps {
    heading ?: string;
    description ?: string;
    subtitle ?: string;
    feature1?: any;
    feature2?: any;
    feature3?: any;
    other?: any;
}

export default function FeatureSection({ 
    heading,
    description,
    subtitle,
    feature1,
    feature2,
    feature3,
    other
}: featureProps) {
    return (
        <section className="w-full relative -z-10">
            <img className="w-full h-fit object-cover" src={"/images/assets/feature_bg.jpg"} />
            <div className="absolute bg-black/80 w-full h-full top-0 left-0 p-10 flex flex-col justify-center items-center">
                <p className="font-extrabold text-3xl text-white whitespace-pre">{heading}</p>
                <hr className="w-full border-t border-neutral-400 dark:border-muted-foreground" />
                <p className='whitespace-pre text-white'>{description}</p>
                <p className='mt-16 mb-7 text-neutral-400'>{subtitle}</p>
                <span className=' flex flex-row gap-5 flex-wrap text-white'>
                    <>{feature1}</>
                    <>{feature2}</>
                </span>
            </div>
        </section>
    )
}