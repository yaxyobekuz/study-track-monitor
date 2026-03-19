import {
  TabsList,
  TabsContent,
  TabsTrigger,
  Tabs as ShadcnTabs,
} from "@/shared/components/shadcn/tabs";
import { Link } from "react-router-dom";

const Tabs = ({
  items = [],
  value,
  defaultValue,
  onValueChange,
  getItemHref,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
  renderContent = false,
}) => {
  if (!items.length) return null;

  const fallbackValue = items[0]?.value;

  return (
    <ShadcnTabs
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      onValueChange={onValueChange}
      className={className}
    >
      <TabsList className={listClassName}>
        {items.map((item) => {
          const href = getItemHref?.(item);

          return (
            <TabsTrigger
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              className={triggerClassName}
              asChild={Boolean(href)}
            >
              {href ? <Link to={href}>{item.label}</Link> : item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {renderContent &&
        items.map((item) => (
          <TabsContent
            key={item.value}
            value={item.value}
            className={contentClassName}
          >
            {item.content}
          </TabsContent>
        ))}
    </ShadcnTabs>
  );
};

export default Tabs;
