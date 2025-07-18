import BGsrc from "/src/assets/images/bg-grad.png"

export default function BackgroundGrad({children}){
    return (
        <>
        <div className="py-[70px] px-[5px] md:py-[170px]"
              style={{
                backgroundImage: `url(${BGsrc})`,
                backgroundPosition: 'bottom',
                backgroundSize: '100% auto', // <- stretches width, keeps height auto
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f3f2fd',
              }}
              >

        {children}
        </div>
        </>
    );
}