import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clients from "../config/clients.json";
import { tagPresets } from "../config/tagPresets";
import BusinessHeader from "../components/BusinessHeader";
import NotFound from "./NotFound";
import StarRating from "../components/StarRating";
import TagChips from "../components/TagChips";
import FeedbackTextarea from "../components/FeedbackTextarea";
import ContinueButton from "../components/ContinueButton";
import Toast from "../components/Toast";
import { buildReviewDraft } from "../utils/buildReviewDraft";
import { copyToClipboard } from "../utils/copyToClipboard";

export default function FeedbackPage() {
  const { slug } = useParams();
  const client = clients[slug];

  // Page ki saari state yahin rahegi
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [text, setText] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (client) document.title = `Feedback | ${client.name}`;
  }, [client]);

  useEffect(() => {
    const reset = () => {
      setRedirecting(false);
      setToastMessage("");
    };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  if (!client) return <NotFound />;

  const handleContinue = async () => {
    if (redirecting) return;
    setRedirecting(true);

    const draft = buildReviewDraft({ selectedTags, text });
    const copied = draft ? await copyToClipboard(draft) : false;

    if (copied) {
      setToastMessage("Feedback copied. Paste it on Google and tap Post.");
    } else if (draft) {
      setToastMessage(
        "Could not copy automatically. Please type your review on Google.",
      );
    } else {
      setToastMessage("Opening Google...");
    }

    // Toast padhne ka time dene ke liye thoda wait, phir same tab mein Google
    setTimeout(
      () => {
        window.location.href = client.googleReviewUrl;
      },
      copied ? 1800 : 800,
    );
  };

  const tags = tagPresets[client.category] ?? [];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <main className="min-h-screen bg-white sm:bg-transparent sm:py-8">
      <div className="mx-auto w-full max-w-md bg-white sm:rounded-3xl sm:shadow-lg px-5 py-6">
        <BusinessHeader
          name={client.name}
          logo={client.logo}
          brandColor={client.brandColor}
        />

        <h1 className="mt-6 text-2xl font-bold text-gray-900">
          Your Feedback Matters
        </h1>
        <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-3">
          It takes less than 60 seconds to complete
        </p>

        {/* Step 5: StarRating yahan aayega */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900">
            How Was Your Overall Experience?
          </h2>
          <div className="mt-3">
            <StarRating value={rating} onChange={setRating} />
          </div>
        </section>

        {/* Step 6: TagChips yahan aayega */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900">
            What did you think?
          </h2>
          <div className="mt-3">
            <TagChips
              tags={tags}
              selected={selectedTags}
              onToggle={toggleTag}
              brandColor={client.brandColor}
            />
          </div>
        </section>

        {/* Step 6: FeedbackTextarea yahan aayega */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-gray-900">
            What could've made it perfect?
          </h2>
          <div className="mt-3">
            <FeedbackTextarea
              value={text}
              onChange={setText}
              brandColor={client.brandColor}
            />
          </div>
        </section>
        {/* Step 7: ContinueButton yahan aayega */}
        <ContinueButton
          onClick={handleContinue}
          loading={redirecting}
          brandColor={client.brandColor}
        />
      </div>
      <Toast message={toastMessage} />
    </main>
  );
}
