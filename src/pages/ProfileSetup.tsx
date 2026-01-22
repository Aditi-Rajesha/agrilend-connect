import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Mail,
  UserRound,
  Calendar,
  ArrowLeft,
} from "lucide-react";

import { useApp } from "@/contexts/AppContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useToast } from "@/hooks/use-toast";

/**
 * ✅ ONLY ALPHABETS for names (NO SPACES)
 * - English: A-Z only
 * - Hindi: Devanagari letters only
 * - Removes spaces, numbers, emojis, special characters automatically
 */
const onlyEnglishAlphabetsNoSpaces = (value: string) => {
  return value.replace(/[^A-Za-z]/g, "");
};

const onlyHindiAlphabetsNoSpaces = (value: string) => {
  return value.replace(/[^\u0900-\u097F]/g, "");
};

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { farmerProfile, setFarmerProfile } = useApp();
  const { language } = useLanguage();

  // ✅ English name fields
  const [firstNameEn, setFirstNameEn] = useState(farmerProfile.firstName || "");
  const [lastNameEn, setLastNameEn] = useState(farmerProfile.lastName || "");

  // ✅ Hindi name fields
  const existingHi = (farmerProfile.nameHi || "").trim();
  const splitHi = existingHi ? existingHi.split(" ") : [];
  const defaultFirstHi = splitHi[0] || "";
  const defaultLastHi = splitHi[1] || "";

  const [firstNameHi, setFirstNameHi] = useState(defaultFirstHi);
  const [lastNameHi, setLastNameHi] = useState(defaultLastHi);

  // ✅ Other fields
  const [email, setEmail] = useState(farmerProfile.email || "");
  const [dob, setDob] = useState(farmerProfile.dob || "");
  const [address, setAddress] = useState(farmerProfile.address || "");

  const handleSave = () => {
    const fullNameEn = `${firstNameEn} ${lastNameEn}`.trim();
    const fullNameHi = `${firstNameHi} ${lastNameHi}`.trim();

    const finalEn = fullNameEn || "Farmer";
    const finalHi = fullNameHi || (fullNameEn ? fullNameEn : "किसान");

    setFarmerProfile({
      ...farmerProfile,

      firstName: firstNameEn,
      lastName: lastNameEn,

      email,
      dob,
      address,

      nameEn: finalEn,
      nameHi: finalHi,
    });

    toast({
      title: language === "hi" ? "प्रोफ़ाइल सेव हो गई ✅" : "Profile saved ✅",
      description:
        language === "hi"
          ? "आपका विवरण अपडेट कर दिया गया है।"
          : "Your details have been updated.",
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition"
        >
          <ArrowLeft className="w-4 h-4" />
          {language === "hi" ? "डैशबोर्ड" : "Dashboard"}
        </button>

        <LanguageToggle />
      </header>

      {/* Main */}
      <main className="p-6 flex justify-center">
        <div className="w-full max-w-2xl animate-fade-in">
          <div className="card-elevated p-6 md:p-8">
            <h1 className="text-2xl font-bold text-foreground">
              {language === "hi" ? "प्रोफ़ाइल विवरण" : "Profile Details"}
            </h1>

            <p className="text-muted-foreground mt-1">
              {language === "hi"
                ? "अपने विवरण भरें/अपडेट करें।"
                : "Fill/update your personal details."}
            </p>

            <p className="text-xs text-muted-foreground mt-2">
              {language === "hi"
                ? `फ़ोन: +91 ${farmerProfile.phone}`
                : `Phone: +91 ${farmerProfile.phone}`}
            </p>

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Name fields */}
              {language === "en" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        value={firstNameEn}
                        onChange={(e) =>
                          setFirstNameEn(onlyEnglishAlphabetsNoSpaces(e.target.value))
                        }
                        placeholder="Enter first name"
                        className="input-field pl-12"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Only alphabets (no spaces)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        value={lastNameEn}
                        onChange={(e) =>
                          setLastNameEn(onlyEnglishAlphabetsNoSpaces(e.target.value))
                        }
                        placeholder="Enter last name"
                        className="input-field pl-12"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Only alphabets (no spaces)
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      पहला नाम (हिंदी)
                    </label>
                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        value={firstNameHi}
                        onChange={(e) =>
                          setFirstNameHi(onlyHindiAlphabetsNoSpaces(e.target.value))
                        }
                        placeholder="पहला नाम"
                        className="input-field pl-12"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      केवल अक्षर (स्पेस नहीं)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      उपनाम (हिंदी)
                    </label>
                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        value={lastNameHi}
                        onChange={(e) =>
                          setLastNameHi(onlyHindiAlphabetsNoSpaces(e.target.value))
                        }
                        placeholder="उपनाम"
                        className="input-field pl-12"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      केवल अक्षर (स्पेस नहीं)
                    </p>
                  </div>
                </>
              )}

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "hi" ? "ईमेल" : "Email"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "hi" ? "जन्मतिथि" : "Date of Birth"}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="input-field pl-12"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {language === "hi" ? "पता" : "Address"}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={language === "hi" ? "घर का पता लिखें" : "Enter address"}
                    className="input-field pl-12"
                  />
                </div>
              </div>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={language === "en" ? !firstNameEn.trim() : !firstNameHi.trim()}
              className="mt-6 w-full py-3.5 rounded-xl btn-primary-gradient font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === "hi" ? "सेव करें और आगे बढ़ें" : "Save & Continue"}
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-xs text-muted-foreground mt-4 text-center">
              {language === "hi"
                ? "नाम में केवल अक्षर (स्पेस नहीं) ✅"
                : "Only alphabets allowed (no spaces) ✅"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSetup;
