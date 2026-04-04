import { motion } from 'framer-motion'
import img1 from "../assets/image1.jpeg";
import img2 from "../assets/image2.jpeg";
import img3 from "../assets/image3.jpeg";
import img4 from "../assets/image4.jpeg";
import img5 from "../assets/image5.jpeg";
import img6 from "../assets/image6.jpeg";
import img7 from "../assets/image7.jpeg";
import img8 from "../assets/image8.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export default function Gallery() {
  return (
    <div className="pt-32 pb-24 min-h-screen container mx-auto px-6 lg:px-12">
       <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Gallery & Media</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A collection of workspaces, setups, and events.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-xl overflow-hidden group shadow-lg border border-border bg-card relative aspect-square"
          >
            <img 
              src={img} 
              alt={`Gallery image ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
