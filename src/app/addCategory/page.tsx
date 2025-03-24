import Navigation from "@/components/Navigation/Navigation";
import AddCategory from "@/components/AddCategory/AddCategory";
function AddCategoryPage() {
    return (
        <div className="container">
            <h1>Create a category</h1>
            <AddCategory/>
            <Navigation />
        </div>
    );
} export default AddCategoryPage;