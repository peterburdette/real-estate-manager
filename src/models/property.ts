import mongoose, { Document } from 'mongoose';

interface IProperty extends Document {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: number;
  propertyValue: number;
  monthlyRentalIncome: number;
  squareFeet: number;
  bedrooms: number;
  bathrooms: number;
  availability: string;
  image: string;
  amenities: string;
  notes: string;
}

let Property: mongoose.Model<IProperty>;

try {
  // Try to retrieve the existing model to avoid OverwriteModelError
  Property = mongoose.model<IProperty>('Property');
} catch (error) {
  // If the model doesn't exist, create it
  const propertySchema = new mongoose.Schema({
    id: String,
    address: String,
    city: String,
    state: String,
    zip: Number,
    propertyValue: Number,
    monthlyRentalIncome: Number,
    squareFeet: Number,
    bedrooms: Number,
    bathrooms: Number,
    availability: String,
    image: String,
    amenities: String,
    notes: String,
  });

  Property = mongoose.model<IProperty>('Property', propertySchema);
}

export default Property;
