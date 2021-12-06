package com.jamongjelly.bbs.util;

import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.imgscalr.Scalr;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;

public class ImageUtils {

    public static void makeThumbnail(MultipartFile imgFile, String filePath, String fileName, String extension) throws IOException {
        InputStream in = imgFile.getInputStream();
        BufferedImage srcImg = ImageIO.read(in);

        int srcImgWidth = srcImg.getWidth(), srcImgHeight = srcImg.getHeight();

//        int num = 250;
//        int thumbWidth, thumbHeight;
//        if (srcImgWidth > srcImgHeight) {
//            thumbWidth = (int) (srcImgWidth * ((double) num / srcImgHeight));
//            thumbHeight = num;
//        } else {
//            thumbWidth = num;
//            thumbHeight = (int) (srcImgHeight * ((double) num / srcImgWidth));
//        }

//        BufferedImage thumbImg = new BufferedImage(thumbWidth, thumbHeight, BufferedImage.TYPE_3BYTE_BGR);

//        Graphics2D g = thumbImg.createGraphics();
//        g.drawImage(srcImg, 0, 0, thumbWidth, thumbHeight, null);

        String thumbName = filePath + fileName;

//        ImageIO.write(thumbImg, extension, new FileOutputStream(thumbName));

        int thumbnailSize = 250;

        Thumbnails.of(srcImg).crop(Positions.CENTER).size(thumbnailSize, thumbnailSize).outputFormat(extension).toFile(thumbName);

        in.close();
    }

    public static BufferedImage resize(MultipartFile mFile, int width, int height) throws IOException {
        InputStream in = mFile.getInputStream();
        BufferedImage originalImg = ImageIO.read(in);
        BufferedImage resizedImg = Scalr.resize(originalImg, width, height);
        in.close();
        return resizedImg;
    }
}
