import { useState, useEffect } from "react";
import { Image, Icon, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { map } from "lodash";
import classNames from "classnames";
import { Category } from "@/api";
import styles from "./Menu.module.scss";

const categoryCtrl = new Category();

export function Menu(props) {
  const { isOpenSearch } = props;
  const [categories, setCategories] = useState(null);
  const [showSearch, setShowSearch] = useState(isOpenSearch);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const openCloseSearch = () => setShowSearch((prevState) => !prevState);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setSearchText(router.query.s || "");
  }, [router.query]);

  const onSearch = (text) => {
    setSearchText(text);
    router.replace(`/search?s=${text}`);
  };

  return (
    <div className={styles.categories}>
      {map(categories, (category) => (
        <Link key={category.id} href={`/productos/${category.attributes.slug}`}>
          {/* <Image src={category.attributes.icon.data.attributes.url} /> */}
          {category.attributes.title}
        </Link>
      ))}

      <button className={styles.search} onClick={openCloseSearch}>
        <Icon name="search" />
      </button>

      <div
        className={classNames(styles.inputContainer, {
          [styles.active]: showSearch,
        })}
      >
        <Input
          id="search-producto"
          placeholder="Buscar"
          className={styles.input}
          focus={true}
          value={searchText}
          onChange={(_, data) => onSearch(data.value)}
        />
        <Icon
          name="close"
          className={styles.closeInput}
          onClick={openCloseSearch}
        />
      </div>
    </div>
  );
}