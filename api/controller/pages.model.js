const mongoose = require("mongoose");
const Pages = require("../models/pages");

exports.getPage = async (req,res,next) =>{
    try{
        const pages = await Pages.find();
        if(pages != null){
            res.status(200).json({
                code: 1,
                data: pages
              });
        }else{
            res.status(401).json({
                code: 0,
                message: "No entry found",
              });
        }

    }
    catch (err){
        res.status(500).json({
            code: 0,
            message: "Somthing went wrong",
            error: err
          });
    }
}


exports.postPage = async (req, res, next) => {
    try {
      const pagesData = new Pages({
        _id: new mongoose.Types.ObjectId(),
        logo: req.body.logo,
        land_mobile: req.body.land_mobile,
        land_wave: req.body.land_wave,
        land_service1: req.body.land_service1,
        land_service2: req.body.land_service2,
        land_service3: req.body.land_service3,
        land_service4: req.body.land_service4,
        land_offer1: req.body.land_offer1,
        land_offer2: req.body.land_offer2,
        land_offer3: req.body.land_offer3,
        land_offer4: req.body.land_offer4,
        d_slider1:req.body.d_slider1,
        d_slider2:req.body.d_slider2,
        m_slider1:req.body.m_slider1,
        m_slider2:req.body.m_slider2  
      });
      const pages = await pagesData.save();
      res.status(200).json({
        code: 1,
        message: "Upload successfully",
        data:pages
      });
    } catch {
      res.status(500).json({
        code: 0,
        message: "Somthing went wrong",
      });
    }
  };


  exports.updatePages = async (req,res,next) => {
    try{
      const pages = await Pages.findByIdAndUpdate(req.params.pageId , req.body)
      res.status(200).json({
        code: 1,
        message: "Update successfuly",
        data:pages
      })
    }
    catch{
      res.status(500).json({
        code: 0,
        message: "Something went wrong"
      })
    }
  }
