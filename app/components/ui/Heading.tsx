'use client';

interface HeadingProps {
  title?: string;
  heading1?:string;
  heading2?:string;
  heading3?:string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ 
  title, 
  heading1,
  heading2,
  heading3,
  subtitle,
  center
}) => {
  return ( 
    <div className={`${center ? 'text-center' : 'text-start'} `} >
      <div className="text-2xl font-bold">
        {title}
      </div>
      <div className="text-lg font-bold">
        {heading1}
      </div>
      <div className="text-base font-bold">
        {heading2}
      </div>
      <div className="font-light text-sm text-neutral-400 mt-2">
        {subtitle}
      </div>
    </div>
   );
}
 
export default Heading;