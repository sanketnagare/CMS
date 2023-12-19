import "./App.css";
import { useState, useEffect } from "react";
import Table from "./components/Table";
import axios from "axios";
import Header from "./components/Header";
import { toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleDetails from "./components/ArticleDetails";
import Success from "./components/Success";
import Cancle from "./components/Cancle";
import { loadStripe } from "@stripe/stripe-js";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticleIds, setSelectedArticleIds] = useState([]);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const handleArticleDetails = (articleId) => {
    const article = articles.find((a) => a._id === articleId);
    setSelectedArticle(article);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/getallarticles"
        );
        setArticles(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchArticles();
  }, []);

  // to update a single record in table
  const handleArticles = (newarticle) => {
    let newArr = articles.map((a, idx) => {
      if (a._id === newarticle._id) {
        return { ...a, ...newarticle };
      }
      return a;
    });
    console.log(newArr);
    setArticles(newArr);
  };

  // to update multiple records in table
  const handleMultipleArticles = async (updatedArticles) => {
    try {
      // Filter out the deleted articles from the current state
      setArticles(updatedArticles);
    } catch (error) {
      console.error("Error handling deleted articles:", error);
    }
  };

  // for updating the table for category dropdown
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const getFilteredArticles = () => {
    // if all then return all else return perticular category
    return selectedCategory === "All"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);
  };

  const handleCreateArticle = async (formData) => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:4000/api/v1/createarticle",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newArticle = response.data.data;
      toast.success("New record created in table");
      // Update the local state with the new article
      setArticles((prevArticles) => [...prevArticles, newArticle]);
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  // const stripeLoader = loadStripe(
  //   "pk_test_51OOg4USBKEi1G9gvwCjXwHBUr2ONpHYRhNfO5uhbKA1bRe0cSYBZtGPlEcdMZka1hnbyZyGehrYoh15PILzCE7as00gXPwvu6W"
  // );

  // const handleCheckout = async () => {
  //   try {
  //     const stripe = await stripeLoader;
  //     // fetched all selected articles using selectedArticlesIds from all articles
  //     const selectedArticles = articles.filter((article) =>
  //       selectedArticleIds.includes(article._id)
  //     );

  //     if(selectedArticles.length === 0) {
  //       alert("Please select at least one article to checkout")
  //     }
  //     console.log(selectedArticles);

  //     const checkOutData = {
  //       articles: selectedArticles.map((article) => ({
  //         title: article.title,
  //         price: 100,
  //         quantity: 1,
  //       })),
  //       customerName: 'Sanket',
  //       customerAddress: 'Pune',
  //     };


  //     console.log("before call", checkOutData)
  //     const response = await axios.post(
  //       "http://localhost:4000/api/v1/create-checkout-session",
  //       checkOutData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).catch((error) => {
  //       console.error("Error in API call:", error);
  //       throw error; // Rethrow the error to propagate it to the outer catch block
  //     });

  //     console.log(response.data.id);

  //         // Ensure that the sessionId is valid
  //   if (!response.data.id) {
  //     console.error("Invalid sessionId received from the server");
  //     return;
  //   }

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: response.data.id,
  //     });

  //     if (result.error) {
  //       console.log(result.error);
  //     }
  //   } catch (error) {
  //     console.error("Error in checkout", error);
  //   }
  // };
  return (
    <div>
      {/* <Header
        onCreateArticle={handleCreateArticle}
        selectedArticleIds={selectedArticleIds}
        handleArticles={handleArticles}
        handleMultipleArticles={handleMultipleArticles}
        onCategoryChange={handleCategoryChange}
        articles={articles}
      />
      <Table articles={getFilteredArticles()} onArticleSelect={setSelectedArticleIds} /> */}

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header
                  onCreateArticle={handleCreateArticle}
                  selectedArticleIds={selectedArticleIds}
                  handleArticles={handleArticles}
                  handleMultipleArticles={handleMultipleArticles}
                  onCategoryChange={handleCategoryChange}
                  articles={articles}
                />

              {/* <div className="checkoutcontainer">
              <button className="checkoutbutton" onClick={handleCheckout}>
                  Checkout Selected Articles
                </button>
              </div> */}
                

                <Table
                  articles={getFilteredArticles()}
                  onArticleSelect={(articleIds) =>
                    setSelectedArticleIds(articleIds)
                  }
                />
              </div>
            }
          />
          <Route
            path="/details/:id"
            element={<ArticleDetails handleArticles={handleArticles} />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/cancle" element={<Cancle />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
