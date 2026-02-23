import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart, Users, Shield, Award } from 'lucide-react';

export function About() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            We're real people, building a store you can trust
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            ShopHub started with a simple idea: shopping online should feel personal, reliable, and honest. No bots. No fake reviews. Just real products and real service.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Story */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              We're a small team based in India who got tired of the impersonal, robotic feel of big e-commerce sites. We wanted a place where you could browse, ask questions, and feel confident about what you're buying.
            </p>
            <p>
              Every product we list is hand-picked. We test what we can, read real customer feedback, and only keep what we'd recommend to our own families. That's the standard we hold ourselves to.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {[
            { icon: Heart, title: 'Customer First', desc: 'Your trust is everything. We treat every order like our own.' },
            { icon: Users, title: 'Real Support', desc: 'Actual humans answer your queries – no chatbots, no runaround.' },
            { icon: Shield, title: 'Honest Deals', desc: 'No fake discounts. Real prices, real savings, no games.' },
            { icon: Award, title: 'Quality Focus', desc: 'We curate products we believe in. Quality over quantity.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <item.icon className="w-12 h-12 text-indigo-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Want to say hello?</h3>
          <p className="mb-6 text-indigo-200">We'd love to hear from you. Drop us a line anytime.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
