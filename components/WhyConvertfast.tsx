import { motion } from 'framer-motion';
import { FileCheck2, Shield, WifiOff, MegaphoneOff } from 'lucide-react';
const features = [
    {
      icon: FileCheck2,
      color: '#14B8A6', // teal-500
      title: 'Support all the popular media formats',
      description: 'Convertfast supports all popular media formats including MP4, MP3, JPEG, PNG, MKV and many more.',
    },
    {
      icon: Shield,
      color: '#3B82F6', // blue-500
      title: 'Complete Privacy',
      description: 'Your files never leave your machine.',
    },
    {
      icon: WifiOff,
      color: '#EF4444', // red-500
      title: 'Works Offline',
      description: 'All processing is performed locally, eliminating the need for an internet connection once all components are loaded, thus ensuring smooth operation.',
    },
    {
      icon: MegaphoneOff,
      color: '#EAB308', // yellow-500
      title: 'No awkward Ads',
      description: 'Currently, the website is free of advertisements. Even if ads are introduced in the future, they will be kept to a minimum.',
    },
];

export default function Features() {
  return (
    <div>
      <h1 className="text-4xl font-bold my-5">Why Convertfast?</h1>

        {features.map((feature, index) => (
        <motion.div
          key={`${// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index}feature`}
          className="border p-4 rounded-lg flex space-x-4 mt-5"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div 
            className="flex items-center"
            initial={{ color: '#6B7280' }} // text-gray-500
            transition={{ duration: 0.2 }}
          >
            <feature.icon size={35} color={feature.color}/>
          </motion.div>
          <div className="w-[2px] bg-primary rounded-lg" />
          <div>
            <h2 className="text-2xl font-semibold">{feature.title}</h2>
            <p className="font-medium text-gray-700 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        </motion.div>
        ))}
    </div>
  );
}
