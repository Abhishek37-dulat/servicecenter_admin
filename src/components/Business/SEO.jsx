import React, { useState, useEffect } from "react";
import { Button, Input, message } from "antd";
import { useUpdateBusinessMutation } from "../../redux/services/businessApi";

const { TextArea } = Input;

const BusinessSEO = ({ data, businessId, onCancel }) => {
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation();

  // Initialize the seoData state with empty values
  const [seoData, setSeoData] = useState({
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    canonicalUrl: "",
    imageAltText: "",
    socialMediaTitle: "",
    socialMediaDescription: "",
    facebookTitle: "",
    twitterTitle: "",
    googleAnalyticsId: "",
    slug: "",
  });

  // Prefill form data when the component mounts or when `data` changes
  useEffect(() => {
    if (data?.data && data?.success) {
      setSeoData({
        metaTitle: data?.data?.metaTitle || "",
        metaDescription: data?.data?.metaDescription || "",
        keywords: data?.data?.keywords || "",
        canonicalUrl: data?.data?.canonicalUrl || "",
        imageAltText: data?.data?.imageAltText || "",
        socialMediaTitle: data?.data?.socialMediaTitle || "",
        socialMediaDescription: data?.data?.socialMediaDescription || "",
        facebookTitle: data?.data?.facebookTitle || "",
        twitterTitle: data?.data?.twitterTitle || "",
        googleAnalyticsId: data?.data?.googleAnalyticsId || "",
        slug: data?.data?.slug || "",
      });
    }
  }, [data]); // Re-run this effect whenever the `data` prop changes

  const handleChange = (field, value) => {
    setSeoData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!businessId) {
      message.error("Business ID is missing!");
      return;
    }

    try {
      const response = await updateBusiness({
        id: businessId, // Use businessId directly
        updatedData: seoData,
      }).unwrap();

      message.success("SEO data updated successfully!");
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Error updating SEO:", error);
      message.error(error?.data?.message || "Failed to update SEO data!");
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">SEO Optimization</h2>

      {/* Meta Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Title
        </label>
        <Input
          value={seoData.metaTitle}
          onChange={(e) => handleChange("metaTitle", e.target.value)}
          placeholder="Enter Meta Title"
          className="w-full"
        />
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meta Description
        </label>
        <TextArea
          value={seoData.metaDescription}
          onChange={(e) => handleChange("metaDescription", e.target.value)}
          placeholder="Enter Meta Description"
          className="w-full"
        />
      </div>

      {/* Keywords */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keywords
        </label>
        <Input
          value={seoData.keywords}
          onChange={(e) => handleChange("keywords", e.target.value)}
          placeholder="Enter Keywords"
          className="w-full"
        />
      </div>

      {/* Canonical URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Canonical URL
        </label>
        <Input
          value={seoData.canonicalUrl}
          onChange={(e) => handleChange("canonicalUrl", e.target.value)}
          placeholder="Enter Canonical URL"
          className="w-full"
        />
      </div>

      {/* Image Alt Text */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Alt Text
        </label>
        <Input
          value={seoData.imageAltText}
          onChange={(e) => handleChange("imageAltText", e.target.value)}
          placeholder="Enter Image Alt Text"
          className="w-full"
        />
      </div>

      {/* Social Media Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Social Media Title
        </label>
        <Input
          value={seoData.socialMediaTitle}
          onChange={(e) => handleChange("socialMediaTitle", e.target.value)}
          placeholder="Enter Social Media Title"
          className="w-full"
        />
      </div>

      {/* Social Media Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Social Media Description
        </label>
        <TextArea
          value={seoData.socialMediaDescription}
          onChange={(e) =>
            handleChange("socialMediaDescription", e.target.value)
          }
          placeholder="Enter Social Media Description"
          className="w-full"
        />
      </div>

      {/* Facebook Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facebook Title
        </label>
        <Input
          value={seoData.facebookTitle}
          onChange={(e) => handleChange("facebookTitle", e.target.value)}
          placeholder="Enter Facebook Title"
          className="w-full"
        />
      </div>

      {/* Twitter Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Twitter Title
        </label>
        <Input
          value={seoData.twitterTitle}
          onChange={(e) => handleChange("twitterTitle", e.target.value)}
          placeholder="Enter Twitter Title"
          className="w-full"
        />
      </div>

      {/* Google Analytics ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Google Analytics ID
        </label>
        <Input
          value={seoData.googleAnalyticsId}
          onChange={(e) => handleChange("googleAnalyticsId", e.target.value)}
          placeholder="Enter Google Analytics ID"
          className="w-full"
        />
      </div>

      {/* Slug */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug
        </label>
        <Input
          value={seoData.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="Enter Slug (URL-friendly)"
          className="w-full"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button onClick={handleCancel} className="bg-gray-200">
          Cancel
        </Button>
        <Button
          type="primary"
          loading={isLoading}
          onClick={handleSave}
          className="bg-blue-600 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default BusinessSEO;
