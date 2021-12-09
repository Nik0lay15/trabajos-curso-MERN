const InfoUtil = (req,res)=>{
    res.render("info",{
        args:process.argv,
        os:process.platform,
        version:process.version,
        memoria:process.memoryUsage().rss / 100000,
        path:process.execPath,
        pid:process.pid,
        root:process.argv[1]
    });
};

export default InfoUtil;