import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateBusinessMutation } from "../../redux/services/businessApi";
import { Button, Input } from "antd";

export default function BusinessOtherDetailsForm({ businessId, onClose }) {
  const { register, handleSubmit, setValue } = useForm();
  const [updateBusiness, { isLoading, isSuccess }] = useUpdateBusinessMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  const onSubmit = async (data) => {
    await updateBusiness({ id: businessId, ...data });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Other Business Details</h2>
      
      <label className="block mb-2">Operating Hours</label>
      <Input {...register("operatingHours")} placeholder="e.g., Mon-Fri: 9 AM - 5 PM" className="mb-4"/>

      <label className="block mb-2">Special Offers</label>
      <Input {...register("specialOffers")} placeholder="e.g., 20% off on first order" className="mb-4"/>

      <label className="block mb-2">Booking URL</label>
      <Input {...register("bookingUrl")} placeholder="e.g., https://booking.com/your-business" className="mb-4"/>

      <Button type="primary" onClick={handleSubmit(onSubmit)} loading={isLoading}>
        Save Details
      </Button>
    </div>
  );
}
